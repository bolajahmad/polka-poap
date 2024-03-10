import { AllowedUsers } from "@/models/contract-types";
import { useInkathon, useRegisteredContract, type ContractTxResult } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";
import { contractTxWithToast } from "../(components)/(toasts)/contract-tx-with-toast";
import { ContractIds } from "../(utils)/deployments";

export const useEventsContract = () => {
    const { api } = useInkathon();
    const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Events);

    const registerNewUser = async (userType: AllowedUsers, userAddress: string, userName: string) => {
        if (!api || !contract) return null;

        try {
            let result: ContractTxResult;

             result = await contractTxWithToast(api, userAddress, contract, 'register_organizer', {}, [
                userAddress,
                userName
            ])
        } catch (error) {
            console.error();
            toast.error('An error occurred while trying to register. Please try again later.')
        }
    }

    return {
        registerNewUser,
    }
}