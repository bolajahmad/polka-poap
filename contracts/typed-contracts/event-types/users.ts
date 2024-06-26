import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/users';

export interface UserUpdated {
	by: ReturnTypes.AccountId | null;
	updatedWhen: number | null;
	userHash: Array<number>;
}

