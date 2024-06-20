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
	 * updateTokenContract
	 *
	 * @param { ArgumentTypes.AccountId } token,
	*/
	"updateTokenContract" (
		token: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "updateTokenContract", [token], __options);
	}

	/**
	 * getTokenContract
	 *
	*/
	"getTokenContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getTokenContract", [], __options);
	}

	/**
	 * updateUsersContract
	 *
	 * @param { ArgumentTypes.AccountId } contractAccount,
	*/
	"updateUsersContract" (
		contractAccount: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "updateUsersContract", [contractAccount], __options);
	}

	/**
	 * getUsersContract
	 *
	*/
	"getUsersContract" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getUsersContract", [], __options);
	}

	/**
	 * createNewEvent
	 *
	 * @param { Array<(number | string | BN)> } collectionId,
	 * @param { (number | string | BN) } eventDate,
	 * @param { (number | string | BN) } mintDate,
	*/
	"createNewEvent" (
		collectionId: Array<(number | string | BN)>,
		eventDate: (number | string | BN),
		mintDate: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "createNewEvent", [collectionId, eventDate, mintDate], __options);
	}

	/**
	 * getEventData
	 *
	 * @param { (number | string | BN) } eventId,
	*/
	"getEventData" (
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getEventData", [eventId], __options);
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
	 * registerParticipantForEvent
	 *
	 * @param { (number | string | BN) } eventId,
	*/
	"registerParticipantForEvent" (
		eventId: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerParticipantForEvent", [eventId], __options);
	}

	/**
	 * registerAttendanceOfEvent
	 *
	 * @param { (number | string | BN) } eventId,
	*/
	"registerAttendanceOfEvent" (
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "registerAttendanceOfEvent", [eventId], __options);
	}

	/**
	 * mintEventToken
	 *
	 * @param { (number | string | BN) } eventId,
	*/
	"mintEventToken" (
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "mintEventToken", [eventId], __options);
	}

	/**
	 * getEventParticipants
	 *
	 * @param { (number | string | BN) } eventId,
	*/
	"getEventParticipants" (
		eventId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getEventParticipants", [eventId], __options);
	}

}