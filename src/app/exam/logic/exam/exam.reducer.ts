import { ActionReducer, Action} from '@ngrx/store';

export enum ExamStatus { OFF, READY, RUNNING, TIME_ENDED, ENDED };

export interface State
{
	data: string,
	resultScore: number,
	timeLeft: number, // seconds
	status: ExamStatus,
}

const initialState: State = {
	data: null,
	resultScore: 0,
	timeLeft: 0,
	status: ExamStatus.OFF,
}

export function reducer(state: State = initialState, action: Action): State
{
	return state;
}
