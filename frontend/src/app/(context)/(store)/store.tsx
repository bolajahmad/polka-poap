import { ReactNode } from "react";
import { WalletStoreProvider } from "./wallet";

export function RootStoreProvider({ children }: {children: ReactNode}) {
    return (
        <WalletStoreProvider>
            {children}
        </WalletStoreProvider>
    )
}