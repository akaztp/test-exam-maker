import { Action } from '@ngrx/store';

import { UserStatus } from './user.reducer';

export const ACTION_USER_STATUS = 'USER_STATUS';
export const ACTION_USER_INPUT = 'USER_INPUT';
export const ACTION_USER_LOGIN = 'USER_LOGIN';
export const ACTION_USER_DATA= 'USER_DATA';

export class UserStatusAction implements Action
{
	readonly type = ACTION_USER_STATUS;
	constructor(
		public payload: { status: UserStatus }
	) { }
}

export class UserInputAction implements Action
{
	readonly type = ACTION_USER_INPUT;
	constructor(
		public payload: { username: string }
	) { }
}

export class UserLoginAction implements Action
{
	readonly type = ACTION_USER_LOGIN;
	constructor(
		public payload: {
			username: string,
			password: string,
		}
	) { }
}

export class UserDataAction implements Action
{
	readonly type = ACTION_USER_DATA;
	constructor(
		public payload: { name: string },
	) { }
}
