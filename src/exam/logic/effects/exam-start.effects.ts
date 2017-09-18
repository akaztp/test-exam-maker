import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/concat';

import { ExamStatusAction, ExamEndAction, ExamTimeAction, ACTION_EXAM_START } from '../actions/exam.actions';
import { ExamStatus, State as ExamState } from '../reducers/exam.reducer';
import { MODULE_STORE_TOKEN, State } from '../reducers';
import { ExamTimerService } from '../../data/exam-timer.service';
import { AsyncDataSer } from '../../../utils/asyncData';

@Injectable()
export class ExamStartEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        private actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        private store: Store<State>,
        private examTimerService: ExamTimerService,
    )
    {
        const exam$: Store<ExamState> = this.store.select(state => state.exam);

        this.effect$ = this.actions$.ofType<Action>(ACTION_EXAM_START)
            .withLatestFrom<
            Action,
            ExamState,
            { action: Action, state: ExamState }>
            (exam$, (action, exam) =>
            {
                if (AsyncDataSer.hasData(exam.data, false) && exam.status === ExamStatus.READY)
                    return { action: action, state: exam };
                return null;
            })
            .filter(data => data != null)
            .mergeMap(({ action, state }) =>
            {
                return Observable.concat(
                    Observable.of(new ExamStatusAction({ status: ExamStatus.RUNNING })),
                    this.examTimerService.getTimer(state.data.data.duration)
                        .map(num => new ExamTimeAction({ time: num })),
                    Observable.of(new ExamEndAction({ status: ExamStatus.TIME_ENDED }))
                );
            });
    }
}
