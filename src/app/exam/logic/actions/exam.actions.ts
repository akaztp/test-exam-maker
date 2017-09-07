import { Action } from '@ngrx/store';

import { ExamStatus } from '../reducers/exam.reducer';
import { AsyncDataSer } from "../../../data/asyncData";
import { ExamInfo } from "../../models/exam-info";

export const ACTION_EXAM_STATUS = 'EXAM_STATUS';
export const ACTION_EXAM_START = 'EXAM_START';
export const ACTION_EXAM_END = 'EXAM_END';
export const ACTION_EXAM_DATA = 'EXAM_DATA';
export const ACTION_EXAM_TIME = 'EXAM_TIME';
export const ACTION_EXAM_SCORE = 'EXAM_SCORE';

export class ExamStatusAction implements Action
{
	readonly type = ACTION_EXAM_STATUS;
	constructor(
		public payload: { status: ExamStatus }
	) { }
}

export class ExamStartAction implements Action
{
	readonly type = ACTION_EXAM_START;
}

export class ExamEndAction implements Action
{
	readonly type = ACTION_EXAM_END;
	constructor(
		public payload: { status: ExamStatus }
	) { }
}

export class ExamDataAction implements Action
{
	readonly type = ACTION_EXAM_DATA;
	constructor(
		public payload: { data: AsyncDataSer<ExamInfo> }
	) { }
}

export class ExamTimeAction implements Action
{
	readonly type = ACTION_EXAM_TIME;
	constructor(
		public payload: { time: number }
	) { }
}

export class ExamScoreAction implements Action
{
	readonly type = ACTION_EXAM_SCORE;
	constructor(
		public payload: { score: AsyncDataSer<number>}
	) { }
}
