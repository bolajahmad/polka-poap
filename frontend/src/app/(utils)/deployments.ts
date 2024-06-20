import { SubstrateDeployment } from '@scio-labs/use-inkathon'

import { env } from '@/config/environment'
import { EVENTS_CONTRACT_ADDRESS, USERS_CONTRACT_ADDRESS } from '@/deployments/contracts'

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
      const eventsAbi = await import('@/deployments/events.json')
      const eventsDeployment: SubstrateDeployment = {
        contractId: ContractIds.Events,
        networkId,
        abi: eventsAbi, 
        address: EVENTS_CONTRACT_ADDRESS,
      }
      deployments.push(eventsDeployment);

      const usersAbi = await import('@/deployments/users.json');
      const usersDeployment: SubstrateDeployment = {
        contractId: ContractIds.Users,
        networkId,
        abi: usersAbi,
        address: USERS_CONTRACT_ADDRESS
      }

      deployments.push(usersDeployment)
  }

  return deployments
}
