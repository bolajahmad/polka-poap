/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/events';
import type * as ReturnTypes from '../types-returns/events';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/events.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/events.json';


export default class Methods {
	readonly __nativeContract : ContractPromise;
	readonly __keyringPair : KeyringPair;
	readonly __callerAddress : string;
	readonly __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* updateTokenContract
	*
	* @param { ArgumentTypes.AccountId } token,
	* @returns { void }
	*/
	"updateTokenContract" (
		token: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "updateTokenContract", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [token], __options);
	}

	/**
	* getTokenContract
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getTokenContract" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getTokenContract", [], __options, (result) => { return handleReturnType(result, getTypeDescription(10, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* registerOrganizer
	*
	* @param { ArgumentTypes.AccountId } organizerId,
	* @param { Array<(number | string | BN)> } username,
	* @returns { void }
	*/
	"registerOrganizer" (
		organizerId: ArgumentTypes.AccountId,
		username: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerOrganizer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [organizerId, username], __options);
	}

	/**
	* getOrganizer
	*
	* @param { ArgumentTypes.AccountId } organizerId,
	* @returns { Result<Array<number>, ReturnTypes.LangError> }
	*/
	"getOrganizer" (
		organizerId: ArgumentTypes.AccountId,
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<number>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getOrganizer", [organizerId], __options, (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* registerParticipant
	*
	* @param { (number | string | BN) } eventId,
	* @returns { void }
	*/
	"registerParticipant" (
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerParticipant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [eventId], __options);
	}

	/**
	* createNewEvent
	*
	* @param { (number | string | BN) } collectionId,
	* @param { (number | string | BN) } eventDate,
	* @param { (number | string | BN) } mintDate,
	* @returns { void }
	*/
	"createNewEvent" (
		collectionId: (number | string | BN),
		eventDate: (number | string | BN),
		mintDate: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "createNewEvent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [collectionId, eventDate, mintDate], __options);
	}

	/**
	* getEventData
	*
	* @param { (number | string | BN) } eventId,
	* @returns { Result<ReturnTypes.Activity, ReturnTypes.LangError> }
	*/
	"getEventData" (
		eventId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.Activity, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getEventData", [eventId], __options, (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateMintDate
	*
	* @param { (number | string | BN) } mintDate,
	* @param { (number | string | BN) } eventId,
	* @returns { void }
	*/
	"updateMintDate" (
		mintDate: (number | string | BN),
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "updateMintDate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [mintDate, eventId], __options);
	}

	/**
	* registerParticipantForEvent
	*
	* @param { (number | string | BN) } eventId,
	* @returns { void }
	*/
	"registerParticipantForEvent" (
		eventId: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerParticipantForEvent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [eventId], __options);
	}

	/**
	* registerAttendanceOfEvent
	*
	* @param { (number | string | BN) } eventId,
	* @returns { void }
	*/
	"registerAttendanceOfEvent" (
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "registerAttendanceOfEvent", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [eventId], __options);
	}

	/**
	* mintEventToken
	*
	* @param { (number | string | BN) } eventId,
	* @returns { void }
	*/
	"mintEventToken" (
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "mintEventToken", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [eventId], __options);
	}

	/**
	* getEventParticipants
	*
	* @param { (number | string | BN) } eventId,
	* @returns { Result<ReturnTypes.EventParticipants, ReturnTypes.LangError> }
	*/
	"getEventParticipants" (
		eventId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.EventParticipants, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getEventParticipants", [eventId], __options, (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

}