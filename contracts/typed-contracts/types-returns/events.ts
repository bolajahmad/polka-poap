import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	userExists = 'UserExists',
	collectionAlreadyCreated = 'CollectionAlreadyCreated',
	tokenMintingFailed = 'TokenMintingFailed'
}

export type Activity = {
	eventDate: number,
	eventId: number,
	blockCreated: number,
	collectionId: number,
	createdBy: AccountId,
	mintDate: number
}

export type EventParticipants = {
	participantsRegistered: Array<AccountId>,
	participantsAttended: Array<AccountId>,
	participantsMinted: Array<AccountId>
}

