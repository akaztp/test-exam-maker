import { Action } from '@ngrx/store';

import { ExamStatus } from '../state/exam.state';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';

/**
 * Emitted for changing the status of the exam.
 */
export class ExamStatusAction implements Action
{
    public readonly type = ExamStatusAction.type;
    public static readonly type = 'EXAM_STATUS';
    constructor(
        public payload: { status: ExamStatus },
    ) { }
}

/**
 * Emitted for starting answering the current exam.
 */
export class ExamStartAction implements Action
{
    public readonly type = ExamStartAction.type;
    public static readonly type = 'EXAM_START';
}

/**
 * Emitted for terminating the current exam.
 */
export class ExamEndAction implements Action
{
    public readonly type = ExamEndAction.type;
    public static readonly type = 'EXAM_END';
    constructor(
        public payload: { status: ExamStatus },
    ) { }
}

/**
 * Emitted when data for an exam arrives and must be stored in state.
 */
export class ExamDataAction implements Action
{
    public readonly type = ExamDataAction.type;
    public static readonly type = 'EXAM_DATA';
    constructor(
        public payload: { data: AsyncDataSer<ExamInfo> },
    ) { }
}

/**
 * Emitted when the time for the exam to finish changes.
 */
export class ExamTimeAction implements Action
{
    public readonly type = ExamTimeAction.type;
    public static readonly type = 'EXAM_TIME';
    constructor(
        public payload: { time: number },
    ) { }
}

/**
 * Emitted when a score for the current exam is made available to be stored on state.
 */
export class ExamScoreAction implements Action
{
    public readonly type = ExamScoreAction.type;
    public static readonly type = 'EXAM_SCORE';
    constructor(
        public payload: { score: AsyncDataSer<number> },
    ) { }
}
