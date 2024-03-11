'use client'

import { env } from "@/config/environment"
import { UseInkathonProvider } from "@scio-labs/use-inkathon"
import { PropsWithChildren } from "react"
import { getDeployments } from "../(utils)/deployments"
import Web3AuthProvider from "./(web3-auth-provider)/web3-auth-provider"

export default function ClientProviders({ children }: PropsWithChildren) {
    return (
        <UseInkathonProvider 
            appName="polka-poap" 
            connectOnInit={true} 
            defaultChain={env.defaultChain} 
            deployments={getDeployments()}
        >
            <Web3AuthProvider>{children}</Web3AuthProvider>
        </UseInkathonProvider>
    )
}