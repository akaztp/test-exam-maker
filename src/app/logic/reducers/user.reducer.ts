import { Action } from '@ngrx/store';

import * as userActions from '../actions/user.actions';
export enum UserStatus { NONE, LOGGED, UNAUTH, ERROR }

export interface State
{
    name: string;
    username: string;
    status: UserStatus;
}

const initialState: State = {
    name: '',
    username: '',
    status: UserStatus.NONE,
};

export function reducer(state: State = initialState, action: Action): State
{
    switch (action.type)
    {
        case userActions.ACTION_USER_STATUS:
            return { ...state, status: (action as userActions.UserStatusAction).payload.status };

        case userActions.ACTION_USER_INPUT:
            return { ...state, username: (action as userActions.UserInputAction).payload.username };

        case userActions.ACTION_USER_LOGIN:
            return { ...state, username: (action as userActions.UserLoginAction).payload.username };

        case userActions.ACTION_USER_DATA:
            return { ...state, data: (action as userActions.UserDataAction).payload.name };
    }

    return state;
}
