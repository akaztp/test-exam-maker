import { ActionReducer, Action} from '@ngrx/store';

import { QuestionData } from '../../models/question-data';

export interface State
{
	current: number,
	data: Array<QuestionData>,
}

const initialState: State = {
	current: 0,
	data: [],
}

export function reducer(state: State = initialState, action: Action): State
{
	return state;
}
