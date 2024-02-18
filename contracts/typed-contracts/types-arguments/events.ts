import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	userExists = 'UserExists',
	collectionAlreadyCreated = 'CollectionAlreadyCreated'
}

