import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/skip';
import 'rxjs/add/observable/concat';
import { NavigationGoAction } from 'router-store-ser';

import { ExamStatusAction, ExamEndAction, ExamTimeAction, ExamStartAction } from '../actions/exam.actions';
import { ExamStatus, State as ExamState } from '../state/exam.state';
import { ExamTimerService } from '../../data/exam-timer.service';
import { QuestionsFetchService } from '../../data/questions-fetch.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { startRouteId, questionRouteId } from '../../exam-routing.module';
import { QuestionsDataAction, QuestionsCurrentAction } from '../actions/questions.actions';
import { State, MODULE_STORE_TOKEN } from '../state/state';

/**
 * Business logic implementation:
 * - EXAM_START()
 *   - If (state.exam.status==READY):
 *     - Fetch questions data
 *       - \>QUESTIONS_DATA(),
 *       - \>QUESTIONS_CURRENT(initial)
 *     - \>EXAM_STATUS(RUNNING)
 *     - \>NAVIGATION_GO(EXAM_QUESTION, 1)
 *     - Start timed exam for state.exam.duration
 *     - Two seconds interval, while state.exam.status==RUNNING:
 *       - Fetch exam expiration
 *       - If expired:
 *         - \>EXAM_END(TIME_ENDED)
 *         - \>NAVIGATION_GO(EXAM_RESULT)
 *       - If !expired:
 *         - \>EXAM_TIME(timeLeft)
 */
@Injectable()
export class ExamStartEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        protected actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<State>,
        protected examTimerService: ExamTimerService,
        protected questionsFetchService: QuestionsFetchService,
    )
    {
        const instance: ExamStartEffects = this;
        const exam$: Store<ExamState> = this.store$.select(state => state.exam);

        this.effect$ = this.actions$.ofType<Action>(ExamStartAction.type)
            .withLatestFrom(exam$, testReady)
            .filter(exam => exam != null && AsyncDataSer.hasData(exam.data, false))
            .mergeMap<ExamState, Action>(
                (state) =>
                {
                    return Observable.concat(
                        questionsFetchService.fetchQuestions(state.data.data)
                            .map(questions => new QuestionsDataAction({ data: questions })),
                        Observable.of(new QuestionsCurrentAction({ num: 1 })),
                        produceTimer(state),
                    );
                });

        return;

        function testReady(action: Action, exam: ExamState)
        {
            if (AsyncDataSer.hasData(exam.data, false) && exam.status === ExamStatus.READY)
                return exam;
            return null;
        }

        function produceTimer(state: ExamState)
        {
            const running$ = Observable.of(...[
                new ExamStatusAction({ status: ExamStatus.RUNNING }),
                new NavigationGoAction({
                    commands: ['../question/1'],
                    relativeRouteId: startRouteId,
                }),
            ]);

            const timer$ = instance.examTimerService.getTimer(state.data.data.duration)
                .takeUntil(exam$.filter(s => s.status !== ExamStatus.RUNNING))
                .map(num => new ExamTimeAction({ time: num }));

            const end$ = exam$ // this works because concat() only subscribes end$ after timer$ completes
                .take(1)
                .filter(s => s.status === ExamStatus.RUNNING) // timer ended to the end without interruption
                .mergeMap(_ => Observable
                    .of(...[
                        new ExamEndAction({ status: ExamStatus.TIME_ENDED }),
                        new NavigationGoAction({
                            commands: ['../../result'],
                            relativeRouteId: questionRouteId,
                        })]));

            return Observable.concat(running$, timer$, end$);
        }
    }
}
