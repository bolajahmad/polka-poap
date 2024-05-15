import { ConnectedUser } from '@/models'
import { createStore } from 'zustand/vanilla'

export type WalletState = {
    user?: ConnectedUser
    isConnected?: boolean
}

export type WalletStoreActions = {
    connect: (walletAddress: string) => void,
    disconnect: () => void,
}

export type WalletStore = WalletState & WalletStoreActions

export const initialState: WalletState = {
    isConnected: false
}

export const createWalletStore = (
    initial = initialState,
) => {
    return createStore<WalletStore>()((set) => ({
        ...initial,
        connect: (wallet) => {
            set(() => ({
                user: {
                    walletAddress: wallet,
                    isRegistered: false
                },
                isConnected: true
            }))
        },
        disconnect: () => {
            set(() => ({
                user: undefined,
                isConnected: false
            }))
        },
    }))
}