import { Action } from '@ngrx/store';

import { UserStatus } from './user.reducer';

export const USER_STATUS = 'USER_STATUS';

export function userStatus(status: UserStatus): Action
{
	return { type: USER_STATUS };
}
