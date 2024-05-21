import type { Keyring } from '@polkadot/keyring';

export type OpenloginUserInfo = {
    email?: string;
    name?: string;
    profileImage?: string;
    aggregateVerifier?: string;
    verifier: string;
    verifierId: string;
    dappShare?: string;
    /**
     * Token issued by Web3Auth.
     */
    idToken?: string;
    /**
     * Token issued by OAuth provider. Will be available only if you are using
     * custom verifiers.
     */
    oAuthIdToken?: string;
    /**
     * Access Token issued by OAuth provider. Will be available only if you are using
     * custom verifiers.
     */
    oAuthAccessToken?: string;
    appState?: string;
    touchIDPreference?: string;
    isMfaEnabled?: boolean;
    walletAddress?: string
    encodedSecretKey?: string;
};

export type Signer = ReturnType<Keyring['addFromSeed']>

export type Nullish<T> = T | null | undefined;

export enum AllowedUsers {
    Organizer = 'Organizer',
    Participant = 'Participant',
};