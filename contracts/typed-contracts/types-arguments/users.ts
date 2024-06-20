import type BN from 'bn.js';

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type AccountId = string | number[]

export enum Error {
	userExists = 'UserExists',
	userNotFound = 'UserNotFound'
}

export enum UserType {
	organizer = 'Organizer',
	participant = 'Participant'
}

