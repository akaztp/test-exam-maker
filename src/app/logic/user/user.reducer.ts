import { ActionReducer, Action} from '@ngrx/store';
import { ACTION_USER_STATUS, UserStatusAction, ACTION_USER_INPUT, UserInputAction, ACTION_USER_LOGIN, UserLoginAction, UserDataAction, ACTION_USER_DATA } from "./user.actions";

export enum UserStatus { NONE, LOGGED, UNAUTH, ERROR };

export interface State
{
	name: string,
	username: string,
	status: UserStatus,
}

const initialState: State = {
	name: '',
	username: '',
	status: UserStatus.NONE,
}

export function reducer(state: State = initialState, action: Action): State
{
//	console.log('User.reducer(): ', state, action);
	switch (action.type)
	{
		case ACTION_USER_STATUS:
			return { ...state, status: (action as UserStatusAction).payload.status };
		case ACTION_USER_INPUT:
			return { ...state, username: (action as UserInputAction).payload.username };
		case ACTION_USER_LOGIN:
			return { ...state, username: (action as UserLoginAction).payload.username };
		case ACTION_USER_DATA:
			return { ...state, data: (action as UserDataAction).payload.name};
	}

	return state;
}
