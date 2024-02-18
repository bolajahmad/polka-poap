/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/events';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/events.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerOrganizer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [organizerId, username], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "createNewEvent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [collectionId, eventDate, mintDate], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "updateMintDate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [mintDate, eventId], __options);
	}

	/**
	* registerParticipant
	*
	* @param { (number | string | BN) } eventId,
	*/
	"registerParticipant" (
		eventId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerParticipant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [eventId], __options);
	}

}