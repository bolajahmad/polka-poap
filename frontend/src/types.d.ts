export type OpenloginUserInfo = {
    email?: string;
    name?: string;
    profileImage?: string;
    aggregateVerifier?: string;
    verifier: string;
    verifierId: string;
    typeOfLogin: LOGIN_PROVIDER_TYPE | CUSTOM_LOGIN_PROVIDER_TYPE;
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

export type Nullish<T> = T | null | undefined | NaN;