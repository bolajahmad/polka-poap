import { env } from "@/config/environment";
import { Signer } from "@/models/contract-types";
import { type SafeEventEmitterProvider } from "@web3auth/base";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { type Web3Auth } from "@web3auth/modal";

export async function initializeWeb3Auth() {
  const { Web3Auth } = await import('@web3auth/modal')
  const { CHAIN_NAMESPACES } = await import('@web3auth/base')

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.OTHER,
    chainId: "0x5", //
    rpcTarget: "https://westend-rpc.polkadot.io",
    // Avoid using public rpcTarget in production.
    // displayName: "Polkadot Testnet",
    // blockExplorerUrl: "https://westend.subscan.io",
    // ticker: "DOT",
    // tickerName: "Polkadot",
  };

  const privateKeyProvider = new CommonPrivateKeyProvider({
    config: { chainConfig }
  });

  const web3auth = new Web3Auth({
    clientId: env.web3AuthID,
    privateKeyProvider,
    chainConfig,
    web3AuthNetwork: 'testnet',
  })
  web3auth.initModal()
  return web3auth
}

async function wait() {
  const { cryptoWaitReady } = await import('@polkadot/util-crypto')
  await cryptoWaitReady()
}

let web3Auth: Web3Auth | null = null
export async function getWeb3Auth() {
  if (web3Auth) return web3Auth
  web3Auth = await initializeWeb3Auth()
  return web3Auth
}

export class SubstrateRPC {
  private provider: SafeEventEmitterProvider

  constructor(provider: SafeEventEmitterProvider) {
    this.provider = provider
    wait()
  }

  async getPrivateKey(): Promise<{
    encodedSecretKey?: string
    address?: string
  }> {
    try {
      const { Keyring } = await import('@polkadot/keyring')
      const privateKey = (await this.provider.request({
        method: 'private_key',
      })) as string
      const keyring = new Keyring({ ss58Format: 42, type: 'sr25519' })

      const keyPair = keyring.addFromUri('0x' + privateKey)
      return {
        encodedSecretKey: privateKey,
        address: keyPair.address,
      }
    } catch (error) {
      console.error(error)
      return {}
    }
  }

  private async getKeyring() {
    const { Keyring } = await import('@polkadot/keyring')
    const { cryptoWaitReady } = await import('@polkadot/util-crypto')
    await cryptoWaitReady()
  
    const keyring = new Keyring({ type: 'sr25519' })
    return keyring
  }

  async deriveSignerFromWallet(secretKey: string): Promise<Signer> {
    const keyring = await this.getKeyring()

    const secret = Buffer.from(secretKey, 'hex')
    const signer = keyring.addFromSeed(secret, {}, 'sr25519')
    return signer
  }
}