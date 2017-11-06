import { Action } from '@ngrx/store';

import { AsyncDataSer } from '../../../utils/asyncData';
import { Question } from '../../models/question';

/**
 * Emitted to set the current question for the current exam.
 */
export class QuestionsCurrentAction implements Action
{
    public readonly type = QuestionsCurrentAction.type;
    public static readonly type = 'QUESTIONS_CURRENT';
    constructor(
        public payload: { num: number },
    ) { }
}

/**
 * Emitted when data for the questions has arrived and must be stored on state.
 */
export class QuestionsDataAction implements Action
{
    public readonly type = QuestionsDataAction.type;
    public static readonly type = 'QUESTIONS_DATA';
    constructor(
        public payload: { data: AsyncDataSer<Question[]> },
    ) { }
}

/**
 * Emitted when the user marks an answer.
 */
export class QuestionsAnswerAction implements Action
{
    public readonly type = QuestionsAnswerAction.type;
    public static readonly type = 'QUESTIONS_ANSWER';
    constructor(
        public payload: { questionNum: number, answerNum: number, checked: boolean },
    ) { }
}
