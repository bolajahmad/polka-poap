import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/events';

export interface ActivityUpdated {
	updatedBy: ReturnTypes.AccountId;
	eventId: number;
	updatedWhen: number;
	lastUpdated: number;
	mintDate: number | null;
}

