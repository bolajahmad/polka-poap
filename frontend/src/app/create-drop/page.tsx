"use client";
import { useContractInteractions } from "@/hooks/useContractInteractions";
import { AllowedUsers } from "@/models";
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreatePOAPDataForm } from "../(components)/(forms)/create-poap-form";
import { useWalletStore } from "../(context)/(store)/wallet";
import { useWeb3Auth } from "../(context)/(web3-auth-provider)/web3-auth-provider";

export default function CreatePOAPDrop() {
  const navigate = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { login } = useWeb3Auth();
  const { connect } = useWalletStore((state) => state);
  const [authenticatedUser, setUser] = useState<any>();
  // const { registerNewUser } = useUsersContract();
  const {registerUser, verifyUser} = useContractInteractions();

  /// handle signin function
  /// TODO: log users in using Polkadot wallet (or web3auth)
  const handleUserSignin = async () => {
      setLoading(true);
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
        setUser(user); 
      connect(user?.walletAddress as string);
      }
    } finally {
      setLoading(false)
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
    <Container h="screen" pt="40">
      <Heading as="h2" mb="20">
        Create a new POAP Drop
      </Heading>

      <Box>
        <Stack>
          <Text color="gray" fontWeight="bold" fontSize="20">
            Choose how you&apos;d like to
          </Text>

          <Box w="100%">
            <Button
              colorScheme="green"
              width="100%"
              size="lg"
              type="button"
              onClick={() => handleUserSignin()}
            >
              Sign In
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
