'use client'

import { OpenloginUserInfo } from "@/models/contract-types";
import { SubstrateWalletPlatform, allSubstrateWallets, isWalletInstalled, useInkathon } from "@scio-labs/use-inkathon";
import { Dispatch, PropsWithChildren, createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { SubstrateRPC, initializeWeb3Auth } from "../../(utils)/web3auth-logic";
import { Action, IWeb3AuthContextStateType, initialState, reducer } from "./reducer";

interface IWeb3AuthContextType {
    state: IWeb3AuthContextStateType
    initializeWallet: () => Promise<void>;
    login: () => Promise<undefined | Partial<OpenloginUserInfo>>;
    dispatch: Dispatch<Action>;
    logout: () => Promise<void>;
}
  
const Web3AuthContext = createContext<IWeb3AuthContextType | null>(null);
  
export const Web3AuthProvider = ({ children }: PropsWithChildren) => {
    const { connect } = useInkathon();
    const [state, dispatch] = useReducer(reducer, initialState)
    const { web3Auth } = state;
    const [browserWallets] = useState(
      allSubstrateWallets.filter((w) => w.platforms.includes(SubstrateWalletPlatform.Browser)),
    )
    const selectedWallet = useMemo(() => browserWallets.find((wallet) => isWalletInstalled(wallet)), [browserWallets])


    const initializeWallet = useCallback(async () => {
        if (!web3Auth) {
            const web3Auth = await initializeWeb3Auth();
            dispatch({
                type: "SET_WEB3_AUTH",
                payload: {
                    web3Auth,
                    provider: web3Auth.provider,
                }
            })
        }
    }, [web3Auth])

    const login = async () => {
        if (web3Auth) {
            const provider = await web3Auth.connect();
            const loggedInUser = await web3Auth.getUserInfo();
            dispatch({
                type: "SET_LOGIN_USER",
                payload: {
                    provider,
                    userInfo: loggedInUser,
                }
            })

            console.log({ loggedInUser })

            // await connect?.(undefined, selectedWallet)

            const rpc = new SubstrateRPC(provider!)
            const addressData = await rpc.getPrivateKey();
            dispatch({
              type: "SET_PRIVATE_KEY",
              payload: {
                walletAddress: addressData.address,
                encodedSecretKey: addressData.encodedSecretKey
              }
            })
            return {...loggedInUser, address: addressData.address}
        }
    }

    const logout = async () => {
        if (web3Auth) {
            await web3Auth.logout();
            dispatch({
                type: "LOGOUT_USER",
                payload: undefined
            })
        }
    }

    useEffect(() => {
        initializeWallet()
    }, [initializeWallet])

    return (
        <Web3AuthContext.Provider 
            value={{
                state,
                login,
                initializeWallet,
                dispatch,
                logout,
            }}
        >
            {children}
        </Web3AuthContext.Provider>
    )
}

const useWeb3Auth = () => {
    const context = useContext(Web3AuthContext);
  
    if (!context || context === undefined) {
      throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
    }
  
    return context;
};

export { Web3AuthProvider as default, useWeb3Auth };
  