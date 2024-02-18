'use client'

import { env } from "@/config/environment"
import { UseInkathonProvider } from "@scio-labs/use-inkathon"
import { PropsWithChildren } from "react"
import { getDeployments } from "../[utils]/deployments"

export default function ClientProviders({ children }: PropsWithChildren) {
    return (
        <UseInkathonProvider 
            appName="polka-poap" 
            connectOnInit={true} 
            defaultChain={env.defaultChain} 
            deployments={getDeployments()}
        >
            {children}
        </UseInkathonProvider>
    )
}