import { ActionReducer, Action} from '@ngrx/store';

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
	console.log('User.reducer(): ', state, action);
	return state;
}
