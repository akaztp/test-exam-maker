import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import { NavigationGoAction } from 'router-store-ser';
import { matchObservable } from 'match-observable';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, State, MODULE_STORE_TOKEN } from '../reducers';
import { ExamStartEffects } from './exam-start.effects';
import { ExamStatus, initialState as examInitialState } from '../reducers/exam.reducer';
import { ExamStatusAction, ExamStartAction, ExamEndAction, ExamTimeAction } from '../actions/exam.actions';
import { ExamTimerService } from '../../data/exam-timer.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import { resultRouteId } from '../../exam-routing.module';
import { deepEqual } from '../../utils/deep-equal';

describe('Exam/Logic/' + ExamStartEffects.name, () =>
{
    let effects: ExamStartEffects;
    let actions: Observable<any>;
    let store: Store<State>;
    let examTimerService: ExamTimerService;
    const examDuration = 5; // seconds, expected observable below has this hardcoded

    function init(initialState)
    {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<State, Action>(reducers,
                    initialState ? { initialState: initialState } : {}),
                StoreDevtoolsModule.instrument({
                    maxAge: 50 //  Retains last n states
                }),
            ],
            providers: [
                ExamStartEffects,
                provideMockActions(() => actions.do(a => store.dispatch(a))),
                { provide: MODULE_STORE_TOKEN, useExisting: Store },
                ExamTimerService,
            ]
        });

        effects = TestBed.get(ExamStartEffects);
        store = TestBed.get(Store);
        examTimerService = TestBed.get(ExamTimerService);
    }

    it('should not emit actions when exam.status != READY ', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.OFF } });
        actions = hot('a', { a: new ExamStartAction() });
        const expected = cold('', {});

        expect(effects.effect$).toBeObservable(expected);
    });


    it('should emit timer actions until expired', () =>
    {
        fakeAsync(() =>
        {
            initExam(examDuration);
            actions = Observable.of(new ExamStartAction());
            let matchResult: string;
            matchObservable<Action>(
                    effects.effect$.do(a => store.dispatch(a)),
                    buildExpected(examDuration),
                    true,
                    false,
                    deepEqual)
                .then(() => matchResult = null, (result) => matchResult = result);
            tick(examDuration * 1000 + 1000);
            expect(matchResult).toBeNull();
        })();
    });

    it('should interrupt timer if exam ends', () =>
    {
        fakeAsync(() =>
        {
            initExam(examDuration);
            actions = Observable.concat(
                Observable.of(new ExamStartAction()),
                Observable.interval(2.5 * 1000).take(1).map(() => new ExamEndAction({ status: ExamStatus.ENDED }))
            );
            let matchResult: string;
            matchObservable<Action>(
                    effects.effect$.do(a => store.dispatch(a)),
                    buildExpected(examDuration, examDuration - 2),
                    true,
                    false,
                    deepEqual)
                .then(() => matchResult = null, (result) => matchResult = result);

            tick(examDuration * 1000 + 1000);
            expect(matchResult).toBeNull();
        })();
    });

    /**
     *
     * @param duration Duration in the preset exam data
     */
    function initExam(duration: number)
    {
        init({
            exam: {
                ...examInitialState,
                status: ExamStatus.READY,
                data: new AsyncDataSer({
                    duration: duration, // seconds
                } as ExamInfo, false),
            }
        });

    }

    function buildExpected(timerStart: number, timerEnd: number = 0)
    {
        const expected: Array<Action> = [new ExamStatusAction({ status: ExamStatus.RUNNING })];
        for (; timerStart >= timerEnd; --timerStart)
            expected.push(new ExamTimeAction({ time: timerStart }));

        if (timerEnd === 0)
        {
            expected.push(new ExamEndAction({ status: ExamStatus.TIME_ENDED }));
            expected.push(new NavigationGoAction({
                commands: ['../result'],
                relativeRouteId: resultRouteId
            }));
        }

        return expected;
    }

});
