import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/concat';
import { NavigationGoAction } from 'router-store-ser';

import { ExamStatusAction, ExamEndAction, ExamTimeAction, ACTION_EXAM_START } from '../actions/exam.actions';
import { ExamStatus, State as ExamState } from '../reducers/exam.reducer';
import { MODULE_STORE_TOKEN, State } from '../reducers';
import { ExamTimerService } from '../../data/exam-timer.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { resultRouteId } from '../../exam-routing.module';

@Injectable()
export class StartEffects
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
        const instance: StartEffects = this;
        const exam$: Store<ExamState> = this.store.select(state => state.exam);

        this.effect$ = this.actions$.ofType<Action>(ACTION_EXAM_START)
            .withLatestFrom<Action, ExamState, { action: Action, state: ExamState }>(exam$, testReady)
            .filter(data => data != null)
            .mergeMap(produceTimer);

        function testReady(action, exam)
        {
            if (AsyncDataSer.hasData(exam.data, false) && exam.status === ExamStatus.READY)
                return { action: action, state: exam };
            return null;
        }

        function produceTimer({ action, state })
        {
            const running$ = Observable.of(new ExamStatusAction({ status: ExamStatus.RUNNING }));

            const timer$ = instance.examTimerService.getTimer(state.data.data.duration)
                .takeUntil(exam$.filter(s => s.status !== ExamStatus.RUNNING))
                .map(num => new ExamTimeAction({ time: num }));

            const end$ = Observable
                .of(0) // something different from null
                .withLatestFrom(exam$, (a, s) => s.status === ExamStatus.RUNNING ? a : null)
                .filter(a => a !== null)
                .mergeMap(_ => Observable
                    .of(...[
                        new ExamEndAction({ status: ExamStatus.TIME_ENDED }),
                        new NavigationGoAction({
                            commands: ['../result'],
                            relativeRouteId: resultRouteId
                        })]));

            return Observable.concat(running$, timer$, end$);
        }
    }

}
