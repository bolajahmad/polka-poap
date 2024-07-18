"use client";
import { useContractInteractions } from "@/hooks/useContractInteractions";
import { AllowedUsers } from "@/models";
import {
  Box,
  Container,
  Heading
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreatePOAPDataForm } from "../(components)/(forms)/create-poap-form";
import { useWalletStore } from "../(context)/(store)/wallet";
import { useWeb3Auth } from "../(context)/(web3-auth-provider)/web3-auth-provider";
import PromptAuthenticateUserView from "./(components)/prompt-authenticate-user";

export default function CreatePOAPDrop() {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useWeb3Auth();
  const { connect } = useWalletStore((state) => state);
  const [authenticatedUser, setAuthenticatedUser] = useState<any>();
  // const { registerNewUser } = useUsersContract();
  const {registerUser, verifyUser} = useContractInteractions();

  /// handle signin function
  /// TODO: log users in using Polkadot wallet (or web3auth)
  /// After connect wallet; check if wallet is a linked wallet
  /// This can be checked on the user contract's validate_linked_account
  const handleUserSignin = async () => {
      setIsLoading(true);
    try {
      const user = await login();

      console.log({ user})
      // call users contract to login as an organizer.
      // if organizer exists, then allow login
      // if organizer does not exist, create and allow login
      const result = await verifyUser(
        AllowedUsers.Organizer, 
        (user as any)?.address as string, 
        user?.encodedSecretKey as string,
        // user?.email ?? user?.name ?? '', 
      );
      
      if (result) {
        setAuthenticatedUser(user); 
        connect(user?.walletAddress as string);
      }
    } finally {
      setIsLoading(false)
    }
  };

  return authenticatedUser && !isLoading ? (
    <Container h="screen" w="100%" maxW="100%" px={40} py="30">
      <Heading textAlign="center" color="blue">
        Provide information about your POAP Drop
      </Heading>

      <Box w="100%">
        <CreatePOAPDataForm />
      </Box>
    </Container>
  ) : (
    <PromptAuthenticateUserView handleSignIn={handleUserSignin} />
  );
}
