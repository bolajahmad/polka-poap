import { getSupportedChains } from './get-supported-chains'
import { getURL } from './get-url'

/**
 * Environment Variables defined in `.env.local`.
 * See `env.local.example` for documentation.
 */
export const env = {
  url: getURL(),
  isProduction: process.env.NEXT_PUBLIC_PRODUCTION_MODE === 'true',

  defaultChain: process.env.NEXT_PUBLIC_DEFAULT_CHAIN!,
  supportedChains: getSupportedChains(),

  web3AuthID: process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID!,
}
