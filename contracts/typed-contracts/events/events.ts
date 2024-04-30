import type * as EventTypes from '../event-types/events';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/events.json';
import {getEventTypeDescription} from "../shared/utils";
import {handleEventReturn} from "@727-ventures/typechain-types";

export default class EventsClass {
	readonly __nativeContract : ContractPromise;
	readonly __api : ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		api : ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__api = api;
	}

	public subscribeOnUserUpdatedEvent(callback : (event : EventTypes.UserUpdated) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('UserUpdated', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.UserUpdated);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'UserUpdated');
	}

	public subscribeOnActivityUpdatedEvent(callback : (event : EventTypes.ActivityUpdated) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('ActivityUpdated', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.ActivityUpdated);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'ActivityUpdated');
	}


	private __subscribeOnEvent(
		callback : (args: any[], event: any) => void,
		filter : (eventName: string) => boolean = () => true
	) {
		// @ts-ignore
		return this.__api.query.system.events((events) => {
			events.forEach((record: any) => {
				const { event } = record;

				if (event.method == 'ContractEmitted') {
					const [address, data] = record.event.data;

					if (address.toString() === this.__nativeContract.address.toString()) {
						const {args, event} = this.__nativeContract.abi.decodeEvent(data);

						if (filter(event.identifier.toString()))
							callback(args, event);
					}
				}
			});
		});
	}

}