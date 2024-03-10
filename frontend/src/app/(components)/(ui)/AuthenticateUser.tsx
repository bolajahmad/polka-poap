'use client'

import { useWeb3Auth } from "@/app/(context)/(web3-auth-provider)/web3-auth-provider";
import { truncateTextOrHash } from "@/app/(utils)/general-helpers";
import { SubstrateRPC } from "@/app/(utils)/web3auth-logic";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { useCallback } from "react";
import { ChooseUserTypeModal } from "../(modals)/ChooseUserType";

export function AuthenticateUser() {
    const { state: {provider, userInfo}, logout, dispatch } = useWeb3Auth();

      const fetchPrivateKey = useCallback(async () => {
        if (provider) {
            const rpc = new SubstrateRPC(provider)
            const loggedInUser = await rpc.getPrivateKey();
            dispatch({
              type: "SET_PRIVATE_KEY",
              payload: {
                walletAddress: loggedInUser.address,
                encodedSecretKey: loggedInUser.encodedSecretKey
              }
            })
        }
      }, [provider, dispatch])
      console.log({ provider })

  return (
    <div className={classNames('flex gap-4 items-center')}>
        {!provider ? (
          <ChooseUserTypeModal handleClose={() => logout()} />
        ) : (
          <div className="flex items-center gap-4">
            <Button className="bg-transparent border text-gray-600 border-gray-600">View Profile</Button>
            <Button className="bg-gray-600" onClick={() => fetchPrivateKey()}>{userInfo?.encodedSecretKey ? truncateTextOrHash(userInfo?.walletAddress, 5) : "Get Private Key"}</Button>
          </div>
        )}
    </div>
  )
}

