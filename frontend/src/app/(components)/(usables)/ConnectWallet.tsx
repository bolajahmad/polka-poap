'use client';

import { truncateTextOrHash } from "@/app/(utils)/general-helpers";
import { env } from "@/config/environment";
import { Button, Flex, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { encodeAddress } from "@polkadot/util-crypto";
import { allSubstrateWallets, getSubstrateChain, isWalletInstalled, SubstrateChain, SubstrateWalletPlatform, useInkathon } from "@scio-labs/use-inkathon";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { AiOutlineCheckCircle, AiOutlineDisconnect } from "react-icons/ai";
import { FiChevronDown, FiExternalLink } from "react-icons/fi";

type Props = {
    onConnected?: () => void
    onDisconnect?: () => void
}

export const ConnectWalletButton = ({ onConnected, onDisconnect }: Props) => {
    const { activeAccount, connect, activeChain, switchActiveChain, accounts, setActiveAccount, disconnect } = useInkathon();

    const supportedChains = useMemo(() => 
        env.supportedChains.map((networkId) => getSubstrateChain(networkId) as SubstrateChain)
    , []);

    const browserWallets = useMemo(() => {
        const installed = [];
        const uninstalled = [];

        for (const wallet of allSubstrateWallets) {
            if (wallet.platforms.includes(SubstrateWalletPlatform.Browser)) {
                if (isWalletInstalled(wallet)) {
                    installed.push(wallet);
                } else {
                    uninstalled.push(wallet)
                }
            }
        }

        return [installed, uninstalled]
    }, [])

    if (!activeAccount) {
        return (
            <Menu>
                <MenuButton as={Button} rightIcon={<FiChevronDown />}>
                    Connect Wallet
                </MenuButton>

                <MenuList>
                    {browserWallets[0].map((wallet) => (
                        <MenuItem
                        key={wallet.id}
                        className="cursor-pointer"
                        onClick={() => {
                          connect?.(undefined, wallet)
                            .then(() => onConnected?.())
                        }}
                      >
                        {wallet.name}
                      </MenuItem>
                    ))}
                    {browserWallets[1].map((wallet) => (
                        <MenuItem
                        key={wallet.id}
                        className="cursor-pointer"
                        disabled
                      >
                        <Link href={wallet.urls.website}>
                            <Flex as="span" className="text-sm">
                                <span>{wallet.name}</span>

                                <FiExternalLink size={10} />
                            </Flex>
                            <Text>Not Installed</Text>
                        </Link>
                      </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        )
    }

    return (
        <div className="flex select-none flex-wrap items-stretch justify-center gap-4">
            <Menu>
                <MenuButton
                as={Button}
                className="rounded-2xl bg-gray-900 px-4 py-6 font-bold text-foreground"
                >
                    <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-normal">
                        {truncateTextOrHash(
                            encodeAddress(activeAccount.address, activeChain?.ss58Prefix || 42),
                            8,
                        )}
                        </span>
                    </div>
                    <FiChevronDown className="shrink-0" size={22} aria-hidden="true" />
                    </div>
                </MenuButton>

                <MenuList
                    className="no-scrollbar max-h-[40vh] min-w-[14rem] overflow-scroll rounded-2xl"
                >
                    {/* Supported Chains */}
                    {supportedChains.map((chain) => (
                        <MenuItem
                        disabled={chain.network === activeChain?.network}
                        className={chain.network !== activeChain?.network ? 'cursor-pointer' : ''}
                        key={chain.network}
                        onClick={async () => {
                            await switchActiveChain?.(chain)
                            toast.success(`Switched to ${chain.name}`)
                        }}
                        >
                        <div className="flex w-full items-center justify-between gap-2">
                            <p>{chain.name}</p>
                            {chain.network === activeChain?.network && (
                            <AiOutlineCheckCircle className="shrink-0" size={15} />
                            )}
                        </div>
                        </MenuItem>
                    ))}

                    {/* Available Accounts/Wallets */}
                    <MenuDivider />
                    {(accounts || []).map((acc: any) => {
                        console.log({ acc })
                        // const encodedAddress = encodeAddress(acc.address, activeChain?.ss58Prefix || 42)
                        const truncatedEncodedAddress = truncateTextOrHash(acc.address, 10)

                        return (
                        <MenuItem
                            key={acc.address}
                            disabled={acc.address === activeAccount?.address}
                            className={acc.address !== activeAccount?.address ? 'cursor-pointer' : ''}
                            onClick={() => {
                            setActiveAccount?.(acc)
                            }}
                        >
                            <div className="flex w-full items-center justify-between">
                            <div>
                                <p className="text-xs">{truncatedEncodedAddress}</p>
                            </div>
                            {acc.address === activeAccount?.address && (
                                <AiOutlineCheckCircle className="shrink-0" size={15} />
                            )}
                            </div>
                        </MenuItem>
                        )
                    })}

                    {/* Disconnect Button */}
                    <MenuDivider />
                    <MenuItem className="cursor-pointer" onClick={() => {
                        disconnect?.();
                        onDisconnect?.();
                    }}>
                        <div className="flex gap-2">
                        <AiOutlineDisconnect size={18} />
                        Disconnect
                        </div>
                    </MenuItem>
                    </MenuList>
                </Menu>
            </div>
        )
}
