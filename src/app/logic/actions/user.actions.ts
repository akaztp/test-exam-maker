import { Action } from '@ngrx/store';

import { UserStatus } from '../reducers/user.reducer';

export const ACTION_USER_STATUS = 'USER_STATUS';
export const ACTION_USER_INPUT = 'USER_INPUT';
export const ACTION_USER_LOGIN = 'USER_LOGIN';
export const ACTION_USER_DATA = 'USER_DATA';

/**
 * Changes user status.
 */
export class UserStatusAction implements Action
{
    readonly type = ACTION_USER_STATUS;
    constructor(
        public payload: { status: UserStatus },
    ) { }
}

/**
 * Emitted when user has changed the username input box.
 */
export class UserInputAction implements Action
{
    readonly type = ACTION_USER_INPUT;
    constructor(
        public payload: { username: string },
    ) { }
}

/**
 * Emitted when the user has requested a login.
 */
export class UserLoginAction implements Action
{
    readonly type = ACTION_USER_LOGIN;
    constructor(
        public payload: {
            username: string,
        },
    ) { }
}

/**
 * Emitted when user data is made available (normally comming from server)
 */
export class UserDataAction implements Action
{
    readonly type = ACTION_USER_DATA;
    constructor(
        public payload: { name: string },
    ) { }
}
