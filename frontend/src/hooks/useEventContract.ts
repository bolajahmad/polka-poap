import { AllowedUsers } from "@/models/contract-types";
import { useInkathon, useRegisteredContract, type ContractTxResult } from "@scio-labs/use-inkathon";
import toast from "react-hot-toast";
import { contractTxWithToast } from "../app/(components)/(toasts)/contract-tx-with-toast";
import { ContractIds } from "../app/(utils)/deployments";

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

    const registerEvent = async (caller: string, collectionCid: string, eventDate: number, mintDate: number) => {
        if (!api || !contract) return null;

        try {
            const result = await contractTxWithToast(api, caller, contract, 'create_new_event', {}, [
                collectionCid,
                eventDate,
                mintDate
            ])
            console.log({ result })
            return result;
        } catch (error) {
            console.error(error)
            toast.error('Failed to register new event!')
        }
    }

    return {
        registerNewUser,
        registerEvent,
    }
}