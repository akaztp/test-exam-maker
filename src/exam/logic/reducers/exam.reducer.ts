import { Action } from '@ngrx/store';

import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import * as examActions from '../actions/exam.actions';
import { State, initialState } from '../state/exam.state';

export function reducer(state: State = initialState, action: Action): State
{
    switch (action.type)
    {
        case examActions.ExamStatusAction.type:
            return { ...state, status: (action as examActions.ExamStatusAction).payload.status };

        case examActions.ExamDataAction.type:
            {
                let timeLeft = 0;
                const adata: AsyncDataSer<ExamInfo> = (action as examActions.ExamDataAction).payload.data;
                if (AsyncDataSer.hasData(adata, false))
                    timeLeft = adata.data.duration;
                return { ...state, timeLeft, data: (action as examActions.ExamDataAction).payload.data };
            }

        case examActions.ExamTimeAction.type:
            return { ...state, timeLeft: (action as examActions.ExamTimeAction).payload.time };

        case examActions.ExamScoreAction.type:
            return { ...state, resultScore: (action as examActions.ExamScoreAction).payload.score };
    }

    return state;
}
