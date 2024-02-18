/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/events';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * registerOrganizer
	 *
	 * @param { ArgumentTypes.AccountId } organizerId,
	 * @param { Array<(number | string | BN)> } username,
	*/
	"registerOrganizer" (
		organizerId: ArgumentTypes.AccountId,
		username: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerOrganizer", [organizerId, username], __options);
	}

	/**
	 * createNewEvent
	 *
	 * @param { (number | string | BN) } collectionId,
	 * @param { (number | string | BN) } eventDate,
	 * @param { (number | string | BN) } mintDate,
	*/
	"createNewEvent" (
		collectionId: (number | string | BN),
		eventDate: (number | string | BN),
		mintDate: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "createNewEvent", [collectionId, eventDate, mintDate], __options);
	}

	/**
	 * updateMintDate
	 *
	 * @param { (number | string | BN) } mintDate,
	 * @param { (number | string | BN) } eventId,
	*/
	"updateMintDate" (
		mintDate: (number | string | BN),
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "updateMintDate", [mintDate, eventId], __options);
	}

	/**
	 * registerParticipant
	 *
	 * @param { (number | string | BN) } eventId,
	*/
	"registerParticipant" (
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerParticipant", [eventId], __options);
	}

}