import { Nullish, OpenloginUserInfo } from "@/types";
import { type IProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";

type ActionType = "SET_WEB3_AUTH" | "SET_LOGIN_USER" | "SET_PRIVATE_KEY";

export type Action = { type: string, payload: undefined } | { type: ActionType, payload: Record<string, any> };

export interface IWeb3AuthContextStateType {
    web3Auth: Nullish<Web3Auth>
    provider: Nullish<IProvider>
    userInfo: Partial<OpenloginUserInfo>
}

export const initialState: IWeb3AuthContextStateType = {
    web3Auth: null,
    provider: null,
    userInfo: {}
}

export function reducer(_state: any, { type, payload }: Action): IWeb3AuthContextStateType {
    switch (type) {
        case "SET_WEB3_AUTH": {
            return {
                ..._state,
                web3Auth: payload?.web3Auth,
                provider: payload?.provider,
            }
        }
        case "SET_LOGIN_USER": {
            return {
                ..._state,
                provider: payload?.provider,
                userInfo: payload?.loggedInUser,
            }
        }
        case "SET_PRIVATE_KEY": {
            return {
                ..._state,
                userInfo: {
                    ..._state.userInfo,
                    walletAddress: payload?.walletAddress,
                    encodedSecretKey: payload?.encodedSecretKey
                }
            }
        }
        default:
            return _state;
    }
}