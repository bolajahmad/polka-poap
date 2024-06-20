import { AllowedUsers } from "@/models/contract-types";
import { contractQuery, decodeOutput, getBalance, useInkathon, useRegisteredContract, type ContractTxResult } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";
import { contractTxWithToast } from "../app/(components)/(toasts)/contract-tx-with-toast";
import { ContractIds } from "../app/(utils)/deployments";

export const useUsersContract = () => {
    const { api } = useInkathon();
    const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Users);

    const registerNewUser = async (userType: AllowedUsers, userAddress: string, userName: string, wallet: string) => {
        if (!api || !contract) return null;
        const txToSign = api.tx.users.createParticipant(userAddress, userName);
        console.log({txToSign1: txToSign})

        try {
            const txToSign = api.tx.users.createParticipant(userAddress, userName);
            console.log({txToSign})
            let result: ContractTxResult;
            let balance = await getBalance(api!, wallet,);
            console.log({ balance })
            const message = userType == AllowedUsers.Participant 
                ? 'create_participant' 
                : 'create_organizer';

             result = await contractTxWithToast(
                api, 
                userAddress, 
                contract, 
                message, {}, [
                userAddress,
                userName
            ]);
            console.log({ result })
            return result;
        } catch (error) {
            console.error(error);
            console.log({ error})
            toast.error('An error occurred while trying to register. Please try again later.')
            return null
        }
    }

    const verifyUser = async (userAddress: string, userType: AllowedUsers) => {
        if (!contract || !api) 
            return null;

        try {
            const message = userType == AllowedUsers.Organizer ? 'verify_organizer' : 'verify_participant'
            const result = await contractQuery(api, contractAddress as string, contract, message, {}, [userAddress]);
            const { isError, decodedOutput, output } = decodeOutput(result, contract, message);

            console.log({ result, decodedOutput, isError })
            if (isError) {
                throw isError;
            }
            return { decodedOutput, output };
        } catch (error) {
            console.log({ error })
            return null;
        }
    }

    return {
        registerNewUser,
        verifyUser,
    }
}