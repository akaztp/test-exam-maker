import { ActionReducer, Action} from '@ngrx/store';

import { QuestionData } from '../../models/question-data';
import { AsyncDataSer } from "../../../data/asyncData";

export interface State
{
	current: number,
	data: AsyncDataSer<Array<QuestionData>>,
}

const initialState: State = {
	current: 0,
	data: null,
}

export function reducer(state: State = initialState, action: Action): State
{
	return state;
}
