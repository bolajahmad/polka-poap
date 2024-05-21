'use client'

import { env } from "@/config/environment"
import { ChakraProvider } from "@chakra-ui/react"
import { UseInkathonProvider } from "@scio-labs/use-inkathon"
import { PropsWithChildren } from "react"
import { getDeployments } from "../(utils)/deployments"
import { RootStoreProvider } from "./(store)/store"
import Web3AuthProvider from "./(web3-auth-provider)/web3-auth-provider"

export default function ClientProviders({ children }: PropsWithChildren) {
    return (
       <ChakraProvider>
            <RootStoreProvider>
                <UseInkathonProvider 
                    appName="polka-poap" 
                    connectOnInit={true} 
                    defaultChain={env.defaultChain} 
                    deployments={getDeployments()}
                >   
                    <Web3AuthProvider>{children}</Web3AuthProvider>
                </UseInkathonProvider>
            </RootStoreProvider>
       </ChakraProvider>
    )
}