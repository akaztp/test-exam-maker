import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/withLatestFrom';
// import 'rxjs/add/operator/takeUntil';
// import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/fromPromise';

import { ACTION_EXAM_END, ExamStatusAction, ExamEndAction, ExamScoreAction } from '../actions/exam.actions';
// import { ExamStatusAction, ExamEndAction, ExamTimeAction, ACTION_EXAM_START } from '../actions/exam.actions';
// import { ExamStatus, State as ExamState } from '../reducers/exam.reducer';
import { ExamEvalService } from '../../data/exam-eval.service';
import { MODULE_STORE_TOKEN, State } from '../reducers';
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
        this.effect$ = this.actions$.ofType<ExamEndAction>(ACTION_EXAM_END)
            .mergeMap(
                action => Observable.concat(
                    Observable.of(new ExamStatusAction({ status: action.payload.status })),
                    Observable.of(1)
                        .withLatestFrom(this.store$, getExamData)
                        .filter(a => a !== null)
                        .mergeMap(
                            ({ examInfo, questions }) =>
                            {
                                return Observable.concat(
                                    Observable
                                        .of(new ExamScoreAction({ score: AsyncDataSer.loading<number>() })),
                                    Observable
                                        .fromPromise(this.examEvalService.evalQuestions(examInfo, questions))
                                        .map(adata => new ExamScoreAction({ score: adata })),
                                );
                            }),
            ));
    }
}

function getExamData(_, storeState: State)
{
    if (!storeState.exam || !AsyncDataSer.hasData(storeState.exam.data, false)
        || !storeState.questions || !AsyncDataSer.hasData(storeState.questions.data, false))
        return null;

    return {
        examInfo: storeState.exam.data.data,
        questions: storeState.questions.data.data,
    };
}
