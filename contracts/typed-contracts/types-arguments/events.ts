import type BN from 'bn.js';

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
	eventDate: (number | string | BN),
	eventId: (number | string | BN),
	blockCreated: (number | string | BN),
	collectionId: (number | string | BN),
	createdBy: AccountId,
	mintDate: (number | string | BN)
}

export type EventParticipants = {
	participantsRegistered: Array<AccountId>,
	participantsAttended: Array<AccountId>,
	participantsMinted: Array<AccountId>
}

export enum UserType {
	organizer = 'Organizer',
	participant = 'Participant'
}

