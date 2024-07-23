"use client";
import { useContractInteractions } from "@/hooks/useContractInteractions";
import { OpenloginUserInfo } from "@/models";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWalletStore } from "../(context)/(store)/wallet";
import { useWeb3Auth } from "../(context)/(web3-auth-provider)/web3-auth-provider";
import PromptAuthenticateUserView from "./(components)/prompt-authenticate-user";

export default function CreatePOAPDrop() {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { login, logout } = useWeb3Auth();
  const { connect } = useWalletStore((state) => state);
  const [authenticatedUser, setAuthenticatedUser] = useState<Partial<OpenloginUserInfo>>();
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
      
      if (user) {
        setAuthenticatedUser(user); 
        connect((user as any)?.address as string);
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <PromptAuthenticateUserView 
      authenticatedUser={authenticatedUser} 
      logout={logout}
      connectedWallet={authenticatedUser?.walletAddress} 
      handleSignIn={handleUserSignin} 
    />
  );
}
// authenticatedUser && !isLoading ? (
//   <Container h="screen" w="100%" maxW="100%" px={40} py="30">
//     <Heading textAlign="center" color="blue">
//       Provide information about your POAP Drop
//     </Heading>

//     <Box w="100%">
//       <CreatePOAPDataForm />
//     </Box>
//   </Container>
// ) : 