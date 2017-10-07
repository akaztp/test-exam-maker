import { Action } from '@ngrx/store';

import { ExamStatus } from '../reducers/exam.reducer';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';

export const ACTION_EXAM_STATUS = 'EXAM_STATUS';
export const ACTION_EXAM_START = 'EXAM_START';
export const ACTION_EXAM_END = 'EXAM_END';
export const ACTION_EXAM_DATA = 'EXAM_DATA';
export const ACTION_EXAM_TIME = 'EXAM_TIME';
export const ACTION_EXAM_SCORE = 'EXAM_SCORE';

/**
 * Emitted for changing the status of the exam.
 */
export class ExamStatusAction implements Action
{
    readonly type = ACTION_EXAM_STATUS;
    constructor(
        public payload: { status: ExamStatus },
    ) { }
}

/**
 * Emitted for starting answering the current exam.
 */
export class ExamStartAction implements Action
{
    readonly type = ACTION_EXAM_START;
}

/**
 * Emitted for terminating the current exam.
 */
export class ExamEndAction implements Action
{
    readonly type = ACTION_EXAM_END;
    constructor(
        public payload: { status: ExamStatus },
    ) { }
}

/**
 * Emitted when data for an exam arrives and must be stored in state.
 */
export class ExamDataAction implements Action
{
    readonly type = ACTION_EXAM_DATA;
    constructor(
        public payload: { data: AsyncDataSer<ExamInfo> },
    ) { }
}

/**
 * Emitted when the time for the exam to finish changes.
 */
export class ExamTimeAction implements Action
{
    readonly type = ACTION_EXAM_TIME;
    constructor(
        public payload: { time: number },
    ) { }
}

/**
 * Emitted when a score for the current exam is made available to be stored on state.
 */
export class ExamScoreAction implements Action
{
    readonly type = ACTION_EXAM_SCORE;
    constructor(
        public payload: { score: AsyncDataSer<number> },
    ) { }
}
