import { Action } from '@ngrx/store';

import { AsyncDataSer } from "../../../data/asyncData";
import { Question } from "../../models/question";

export const ACTION_QUESTIONS_CURRENT = 'QUESTIONS_CURRENT';
export const ACTION_QUESTIONS_DATA = 'QUESTIONS_DATA';
export const ACTION_QUESTIONS_ANSWER = 'QUESTIONS_ANSWER';

export class QuestionsCurrentAction implements Action
{
	readonly type = ACTION_QUESTIONS_CURRENT;
	constructor(
		public payload: { num: number }
	) { }
}

export class QuestionsDataAction implements Action
{
	readonly type = ACTION_QUESTIONS_DATA;
	constructor(
		public payload: { data: AsyncDataSer<Array<Question>> }
	) { }
}

export class QuestionsAnswerAction implements Action
{
	readonly type = ACTION_QUESTIONS_ANSWER;
	constructor(
		public payload: { questionNum: number, answerNum: number, checked: boolean }
	) { }
}
