/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/users';
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
	 * verifyOrganizer
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"verifyOrganizer" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "verifyOrganizer", [account], __options);
	}

	/**
	 * createOrganizer
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { Array<(number | string | BN)> } hash,
	*/
	"createOrganizer" (
		account: ArgumentTypes.AccountId,
		hash: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "createOrganizer", [account, hash], __options);
	}

	/**
	 * verifyParticipant
	 *
	 * @param { ArgumentTypes.AccountId } account,
	*/
	"verifyParticipant" (
		account: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "verifyParticipant", [account], __options);
	}

	/**
	 * createParticipant
	 *
	 * @param { ArgumentTypes.AccountId } account,
	 * @param { Array<(number | string | BN)> } hash,
	*/
	"createParticipant" (
		account: ArgumentTypes.AccountId,
		hash: Array<(number | string | BN)>,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "createParticipant", [account, hash], __options);
	}

}