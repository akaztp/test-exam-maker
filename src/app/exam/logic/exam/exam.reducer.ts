import { ActionReducer, Action} from '@ngrx/store';

import { AsyncDataSer } from "../../../data/asyncData";
import { ExamData } from "../../models/exam-data";
import { ACTION_EXAM_STATUS, ACTION_EXAM_START, ACTION_EXAM_END, ACTION_EXAM_DATA, ACTION_EXAM_TIME, ACTION_EXAM_SCORE, ExamStatusAction, ExamEndAction, ExamDataAction, ExamTimeAction, ExamScoreAction } from "./exam.actions";

export enum ExamStatus { OFF, READY, RUNNING, TIME_ENDED, ENDED };

export interface State
{
	data: AsyncDataSer<ExamData>,
	resultScore: AsyncDataSer<number>,
	timeLeft: number, // seconds
	status: ExamStatus,
}

export const initialState: State = {
	data: null,
	resultScore: null,
	timeLeft: 0,
	status: ExamStatus.OFF,
}

export function reducer(state: State = initialState, action: Action): State
{
	switch (action.type)
	{
		case ACTION_EXAM_STATUS:
			return { ...state, status: (action as ExamStatusAction).payload.status };
		case ACTION_EXAM_END:
			return { ...state, status: (action as ExamEndAction).payload.status };
		case ACTION_EXAM_DATA:
			{
				let timeLeft = 0;
				const adata: AsyncDataSer<ExamData> = (action as ExamDataAction).payload.data;
				if (AsyncDataSer.hasData(adata, false))
					timeLeft = adata.data.duration;
				return { ...state, data: (action as ExamDataAction).payload.data, timeLeft: timeLeft };
			}
		case ACTION_EXAM_TIME:
			return { ...state, timeLeft: (action as ExamTimeAction).payload.time };
		case ACTION_EXAM_SCORE:
			return { ...state, resultScore: (action as ExamScoreAction).payload.score };
	}

	return state;
}
