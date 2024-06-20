import { useWeb3Auth } from "@/app/(context)/(web3-auth-provider)/web3-auth-provider";
import { ContractIds } from "@/app/(utils)/deployments";
import {
  EVENTS_CONTRACT_ADDRESS,
  USERS_CONTRACT_ADDRESS,
} from "@/deployments/contracts";
import * as UsersMetadata from "@/deployments/users.json";
import { AllowedUsers } from "@/models";
import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { useInkathon } from "@scio-labs/use-inkathon";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Contracts = [
  { [ContractIds.Users]: USERS_CONTRACT_ADDRESS },
  { [ContractIds.Events]: EVENTS_CONTRACT_ADDRESS },
];

export const useContractInteractions = () => {
  const [initializedContracts, setContracts] = useState<
    Record<string, ContractPromise>
  >();
  const { provider } = useInkathon();
  const { getSigner } = useWeb3Auth();

  const contractPr = useCallback(async () => {
    if (provider) {
      const api = await ApiPromise.create({ provider });
      if (api) {
        const metadata = JSON.stringify(UsersMetadata);
        const contract = new ContractPromise(
          api,
          metadata,
          USERS_CONTRACT_ADDRESS
        );
        setContracts((prev) =>
          prev
            ? Object.assign(prev, { [ContractIds.Users]: contract })
            : { [ContractIds.Users]: contract }
        );
      }
    }
  }, [provider]);

  const registerUser = async (
    userType: AllowedUsers,
    secretKey: string,
    userAddress: string,
    userName: string
  ) => {
    if (!initializedContracts?.[ContractIds.Users]) return null;
    try {
      const signer = await getSigner(secretKey);
      const gasLimit = BigInt(3000) * BigInt(1000000);
      const storageDepositLimit = null;
      const message =
        userType == AllowedUsers.Participant
          ? "createParticipant"
          : "createOrganizer";

      console.log({ keyAddress: signer?.address });

      /// verify is user exists and exit instead of registering
      const isExisting = await verifyUser(userType, userAddress, signer?.address as string)
      console.log({ isExisting })

      if (isExisting) {
        toast.custom("User already exists!");
        return
      }

      await initializedContracts[ContractIds.Users].tx[message](
        { storageDepositLimit, gasLimit },
        userAddress,
        userName
      ).signAndSend(signer!, (result: any) => {
        if (result.status.isInBlock) {
          console.log("in a block");
        } else if (result.status.isFinalized) {
          console.log("finalized");
          const transactionHash = result.txHash.toHex();
          const blockHash = result.status.asFinalized.toHex();

          console.log({
            result,
            txHash: transactionHash,
            blockHash,
          });
        }
      });

      return true;
    } catch (error) {
      console.error(error);
      console.log({ error });
      toast.error(
        "An error occurred while trying to register. Please try again later."
      );
      return null;
    }
  };

  const verifyUser = async (userType: AllowedUsers, address: string, signerKey: string) => {
    if (!initializedContracts?.[ContractIds.Users]) return null;

    try {
      const message =
        userType == AllowedUsers.Participant
          ? "verifyParticipant"
          : "verifyOrganizer";
      const gasLimit = BigInt(3000) * BigInt(1000000);
      const storageDepositLimit = null;
      
      const signer = await getSigner(signerKey);
      console.log({ signer })

      const { result, output } = await initializedContracts[
        ContractIds.Users
      ].query[message](
        signer?.address as string,
        {
          gasLimit,
          storageDepositLimit,
        },
        address
      );
      const humanOutput = result.toHuman();
      console.log({ humanOutput })

            // check if the call was successful
      if (result.isOk && output) {
        // output the return value
        console.log('Success', output.toHuman());
        return true
      } else {
        console.error('Error', result.asErr, result.toJSON());
        return false
      }
    } catch (error) {
      console.error(error);
      console.log({ error });
      toast.error(
        "An error occurred while trying to register. Please try again later."
      );
      return null;
    }
  };

  useEffect(() => {
    contractPr();
  }, [contractPr]);

  return {
    contractPr,
    contract: initializedContracts,
    registerUser,
    verifyUser
  };
};
