import { Action } from '@ngrx/store';

import { AsyncDataSer } from '../../../utils/asyncData';
import { Question } from '../../models/question';

export const ACTION_QUESTIONS_CURRENT = 'QUESTIONS_CURRENT';
export const ACTION_QUESTIONS_DATA = 'QUESTIONS_DATA';
export const ACTION_QUESTIONS_ANSWER = 'QUESTIONS_ANSWER';

/**
 * Emitted to set the current question for the current exam.
 */
export class QuestionsCurrentAction implements Action
{
    readonly type = ACTION_QUESTIONS_CURRENT;
    constructor(
        public payload: { num: number },
    ) { }
}

/**
 * Emitted when data for the questions has arrived and must be stored on state.
 */
export class QuestionsDataAction implements Action
{
    readonly type = ACTION_QUESTIONS_DATA;
    constructor(
        public payload: { data: AsyncDataSer<Question[]> },
    ) { }
}

/**
 * Emitted when the user marks an answer.
 */
export class QuestionsAnswerAction implements Action
{
    readonly type = ACTION_QUESTIONS_ANSWER;
    constructor(
        public payload: { questionNum: number, answerNum: number, checked: boolean },
    ) { }
}
