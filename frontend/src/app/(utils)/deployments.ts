import { SubstrateDeployment } from '@scio-labs/use-inkathon'

import { env } from '@/config/environment'

/**
 * Add or change your custom contract ids here
 * DOCS: https://github.com/scio-labs/inkathon#2-custom-contracts
 */
export enum ContractIds {
  Events = 'events',
  Users = 'users',
}

export const getDeployments = async (): Promise<SubstrateDeployment[]> => {
  const networks = env.supportedChains
  const deployments: SubstrateDeployment[] = []

  for (const networkId of networks) {
      const abi = await import('@/metadata/events.json')
      const address= 'b1mNsLPe6w97cMWou965EcG4yG2LZBQYy8vzynkgnfu9pr1'

      deployments.push({ contractId: ContractIds.Events, networkId, abi, address })
  }

  return deployments
}
