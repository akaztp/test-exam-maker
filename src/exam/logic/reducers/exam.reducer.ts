import { Action } from '@ngrx/store';

import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import * as examActions from '../actions/exam.actions';

export enum ExamStatus { OFF, READY, RUNNING, TIME_ENDED, ENDED }

export interface State
{
    data: AsyncDataSer<ExamInfo>;
    resultScore: AsyncDataSer<number>;
    timeLeft: number; // seconds
    status: ExamStatus;
}

export const initialState: State = {
    data: null,
    resultScore: null,
    timeLeft: 0,
    status: ExamStatus.OFF,
};

export function reducer(state: State = initialState, action: Action): State
{
    switch (action.type)
    {
        case examActions.ACTION_EXAM_STATUS:
            return { ...state, status: (action as examActions.ExamStatusAction).payload.status };

        case examActions.ACTION_EXAM_DATA:
            {
                let timeLeft = 0;
                const adata: AsyncDataSer<ExamInfo> = (action as examActions.ExamDataAction).payload.data;
                if (AsyncDataSer.hasData(adata, false))
                    timeLeft = adata.data.duration;
                return { ...state, timeLeft, data: (action as examActions.ExamDataAction).payload.data };
            }

        case examActions.ACTION_EXAM_TIME:
            return { ...state, timeLeft: (action as examActions.ExamTimeAction).payload.time };

        case examActions.ACTION_EXAM_SCORE:
            return { ...state, resultScore: (action as examActions.ExamScoreAction).payload.score };
    }

    return state;
}
