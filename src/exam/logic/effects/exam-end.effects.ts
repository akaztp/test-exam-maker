import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/fromPromise';

import { ExamStatusAction, ExamEndAction, ExamScoreAction } from '../actions/exam.actions';
import { ExamEvalService } from '../../data/exam-eval.service';
import { State, MODULE_STORE_TOKEN } from '../state/state';
import { AsyncDataSer } from '../../../utils/asyncData';

/**
 * Business logic implementation:
 * - EXAM_END(status)
 *   - \>EXAM_STATUS(status)
 *   - \>EXAM_SCORE(null)
 *   - Submit answers to service
 *     - \>EXAM_SCORE(score)
 */
@Injectable()
export class ExamEndEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        private actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        private store$: Store<State>,
        private examEvalService: ExamEvalService,
    )
    {
        this.effect$ = this.actions$.ofType<ExamEndAction>(ExamEndAction.type)
            .mergeMap(
                action => Observable.concat(
                    Observable.of(new ExamStatusAction({ status: action.payload.status })),
                    this.store$
                        .take(1)
                        .map(getExamData)
                        .filter(a => a !== null)
                        .mergeMap(
                            ({ examInfo, questions }) =>
                            {
                                return Observable.concat(
                                    Observable
                                        .of(new ExamScoreAction({ score: AsyncDataSer.loading<number>() })),
                                    this.examEvalService.evalQuestions(examInfo, questions)
                                        .map(adata => new ExamScoreAction({ score: adata })),
                                );
                            }),
            ));
    }
}

function getExamData(storeState: State)
{
    if (!storeState.exam || !AsyncDataSer.hasData(storeState.exam.data, false)
        || !storeState.questions || !AsyncDataSer.hasData(storeState.questions.data, false))
        return null;

    return {
        examInfo: storeState.exam.data.data,
        questions: storeState.questions.data.data,
    };
}
