import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/events';

export interface UserUpdated {
	userId: ReturnTypes.AccountId;
	userType: ReturnTypes.UserType;
	username: Array<number>;
	newUser: boolean;
}

export interface ActivityUpdated {
	updatedBy: ReturnTypes.AccountId;
	eventId: number;
	eventDate: number;
	lastUpdated: number;
	mintDate: number | null;
}

