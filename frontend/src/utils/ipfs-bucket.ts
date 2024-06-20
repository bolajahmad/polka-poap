import { SubstrateRPC } from "@/app/(utils)/web3auth-logic";
import { IProvider } from "@web3auth/base";
import { create, type IPFSHTTPClient } from "ipfs-http-client";


const ipfsGateway = 'https://gw.crustfiles.app';

export class IPFSBucket {
    private provider: IProvider;
    private ipfs: IPFSHTTPClient | null = null;

    constructor(provider: IProvider) {
        this.provider = provider;
    }

    async createClient(secretKey: string): Promise<IPFSHTTPClient> {
        const rpc = new SubstrateRPC(this.provider);
        const keyring = await rpc.getKeyring();
        const pair = keyring.addFromUri("0x" + secretKey);
        const sig = pair.sign(pair.address as string);
        const sigHex = '0x' + Buffer.from(sig).toString('hex');

        const authHeader = Buffer.from(`sub-${pair.address}:${sigHex}`).toString('base64');
        /// create IPFS client
        const ipfs = create({
            url: ipfsGateway + '/api/v0',
            headers: {
                authorization: 'Basic ' + authHeader
            }
        })
        this.ipfs = ipfs;

        return ipfs;
    }

    async saveToIPFS(secretKey: string, data: File | Blob) {
        try {
            if (!this.ipfs) {
                await this.createClient(secretKey)
            }
        const { cid } = await this.ipfs!.add(data)

        if (cid) {
            console.log(cid.toV0().toString());
            return cid.toV0().toString();
        } else {
            throw new Error('IPFS add failed, please try again.');
        }
        } catch (error) {
            
        }
    }
}

// export class IPFSBucket {
//     private accessKey: string = env.fbAccess || '';
//     private secretKey: string = env.fbSecret || '';

//     protected bucketManager: any;

//     currentBucket = '';

//     constructor(initBucket = 'polka-poap-bucket') {
//         this.bucketManager = new BucketManager(this.accessKey, this.secretKey);
//         this.currentBucket = initBucket;
//     }

//     async createBucket(name: string, asDefault = false) {
//         try {
//             await this.bucketManager.create(name);
//             if (asDefault) 
//                 this.currentBucket = name;
//             console.log("Created successfully")
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async listBuckets() {
//         try {
//             const buckets = await this.bucketManager.list();
//             return buckets;
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     }

//     // uses this.currentBucket to configure the object manager, 
//     // be sure to update before calling if you need
//     async uploadData(file: File, name?: string, metadata = {}) {
//         try {
//             const objectManager = new ObjectManager(this.accessKey, this.secretKey, {
//                 bucket: this.currentBucket
//             })
//             console.log({ file, objectManager: ObjectManager.keys[0], env })
    
//             const uploadedData = await objectManager.upload(name || file.name, file, metadata, {});
//             console.log({ uploadedData })
//             return uploadedData;
//         } catch (error) {
//             console.error(error);
//             return null;
//         }
//     }

//     switchBucket(name: string) {
//         this.currentBucket = name;
//     }
// }

// export const ipfsBkt = new IPFSBucket();