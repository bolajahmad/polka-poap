'use client'

import { WalletState, WalletStore, createWalletStore } from "@/store/wallet-store";
import { ReactNode, createContext, useContext, useRef } from "react";
import toast from "react-hot-toast";
import { useStore, type StoreApi } from "zustand"; // Replace "(path-to-store-api-module)" with the actual path to the module that exports the StoreApi type

const StoreContext = createContext<StoreApi<WalletStore> | null>(null);

interface ProviderProps {
    children: ReactNode
}

const initialStore = (): WalletState => {
    return {
        isConnected: false,
        user: undefined
    }
}

export const WalletStoreProvider = ({children}: ProviderProps) => {
    const storeRef = useRef<StoreApi<WalletStore>>();

    if (!storeRef.current) {
        storeRef.current = createWalletStore(initialStore());
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    )
}

export const useWalletStore = <T,>(selector: (store: WalletStore) => T) => {
    const wscontext = useContext(StoreContext);

    if (!wscontext) {
        toast.error('useWalletStore can only be used from within a StoreProvider')
        throw new Error('WalletContext not contained in a Provider');
    }

    return useStore(wscontext, selector)
}
