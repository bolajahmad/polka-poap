'use client'

import { useWeb3Auth } from '@/app/(context)/(web3-auth-provider)/web3-auth-provider';
import { useEventsContract } from '@/app/hooks/useEventContract';
import { Button } from '@/components/ui/button';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { AllowedUsers } from '../../../models/contract-types';

type Props = {
    handleClose: (prevState?: boolean) => void;
}

export const ChooseUserTypeModal = ({ handleClose }: Props) => {
    const [openModal, setModalOpen] = useState(false);
    const [userType, setUserType] = useState<AllowedUsers | undefined>(undefined);
    const { login } = useWeb3Auth()
    const {registerNewUser} = useEventsContract();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const userInfo = await login();
            console.log({ userInfo })
            registerNewUser(userType as AllowedUsers, userInfo?.walletAddress || '', userInfo?.email || userInfo?.name || '')
            setModalOpen(false);
        } catch (error) {
            console.error(error)
            toast.error('An error occurred while trying to login. Please try again later.')
        }
    }

    const close = async () => {
        handleClose?.(true);
        setModalOpen(false);
    }

    return (
        <>
            {!openModal && <Button onClick={() => setModalOpen(true)}>Login/Register</Button>}
            <Dialog open={openModal} onClose={() => close()} className={"relative z-50"}>
                <div className="fixed inset-0 bg-white/30" aria-hidden="true" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-5">

                    <div className="fixed inset-0 flex items-center justify-center p-4 backdrop-blur-md">
                <Dialog.Panel>
                    <Dialog.Title>Select user type</Dialog.Title>

                    <p>
                        Choose the type of user you want to create. You cannot change this later.
                    </p>

                    <form action="" onSubmit={(e) => handleSubmit(e)}>
                        <RadioGroup onChange={(value) => setUserType(value as AllowedUsers)}>
                            <div className="flex items-center justify-start gap-4 font-medium">
                                <Radio type="radio" name="userType" id="organizer" value={AllowedUsers.Organizer} />
                                <label htmlFor="organizer">Organizer, looking to create events</label>
                            </div>
                            <div className="flex items-center justify-start gap-4 font-medium">
                                <Radio type="radio" name="userType" id="participant" value={AllowedUsers.Participant} />
                                <label htmlFor="participant">Participant, looking for events to attend</label>
                            </div>
                        </RadioGroup>

                        <div>
                            <Button className='text-red-600 bg-transparent border-current' type='button' onClick={() => close()}>Cancel</Button>
                            <Button className='font-semibold bg-blue-700 text-white' type='submit' disabled={!userType}>Confirm</Button>
                        </div>
                    </form>
                </Dialog.Panel>
                </div></div>
            </Dialog>
        </>
    )
}