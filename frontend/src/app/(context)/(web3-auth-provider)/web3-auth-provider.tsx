'use client'

import { Dispatch, PropsWithChildren, createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { initializeWeb3Auth } from "../../(utils)/web3auth-logic";
import { Action, IWeb3AuthContextStateType, initialState, reducer } from "./reducer";

interface IWeb3AuthContextType {
    state: IWeb3AuthContextStateType
    initializeWallet: () => Promise<void>;
    login: () => Promise<void>;
    dispatch: Dispatch<Action>
}
  
const Web3AuthContext = createContext<IWeb3AuthContextType | null>(null);
  
export const Web3AuthProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { web3Auth } = state;


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
                dispatch
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
  