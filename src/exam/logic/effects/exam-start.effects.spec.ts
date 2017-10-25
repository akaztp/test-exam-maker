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

import { reducersMap } from '../logic.module';
import { ExamStartEffects } from './exam-start.effects';
import { ExamStatus, initialState as examInitialState } from '../state/exam.state';
import { ExamStatusAction, ExamStartAction, ExamEndAction, ExamTimeAction } from '../actions/exam.actions';
import { ExamTimerService } from '../../data/exam-timer.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import { questionRouteId, startRouteId } from '../../exam-routing.module';
import { deepEqual } from '../../utils/deep-equal';
import { failOnObsError } from '../../utils/jasmine-fail-observer';
import { QuestionsDataAction, QuestionsCurrentAction } from '../actions/questions.actions';
import { QuestionsFetchService } from '../../data/questions-fetch.service';
import { Question } from '../../models/question';
import { createExam } from '../../utils/exam-samples';
import { State, MODULE_STORE_TOKEN } from '../state/state';

describe('Exam/Logic/' + ExamStartEffects.name, () =>
{
    let effects: ExamStartEffects;
    let actions: Observable<any>;
    let store$: Store<State>;
    let examTimerService: jasmine.SpyObj<ExamTimerService>;
    let questionsFetchService: jasmine.SpyObj<QuestionsFetchService>;
    const examDuration = 5; // seconds, expected observable below has this hardcoded
    const { exam, questions } = createExam('1');

    it('should not emit actions when exam.status != READY ', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.OFF }, questions: null });
        actions = hot('a', { a: new ExamStartAction() });
        const expected = cold('', {});

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });

    it('should emit timer actions until expired', () => fakeAsync(() =>
    {
        initExam(examDuration);
        examTimerService.getTimer.and.returnValue(getTimerMock(examDuration));
        questionsFetchService.fetchQuestions.and.returnValue(fetchQuestionsMock(questions));

        actions = Observable.of(new ExamStartAction());
        let matchResult: string;
        matchObservable<Action>(
            effects.effect$.catch(failOnObsError).do(a => store$.dispatch(a)),
            buildExpected(examDuration),
            true,
            false,
            deepEqual,
        ).then(() => matchResult = null, result => matchResult = result);

        tick(examDuration * 1000 + 4000);
        tick(1000);
        expect(matchResult).toBeNull();
    })());

    it('should interrupt timer if exam ends', () => fakeAsync(() =>
    {
        initExam(examDuration);
        examTimerService.getTimer.and.returnValue(getTimerMock(examDuration));
        questionsFetchService.fetchQuestions.and.returnValue(fetchQuestionsMock(questions));

        actions = Observable.concat(
            Observable.of(new ExamStartAction()),
            Observable.interval(2.5 * 1000).take(1).map(() => new ExamStatusAction({ status: ExamStatus.ENDED })),
        );
        let matchResult: string;
        matchObservable<Action>(
            effects.effect$.catch(failOnObsError).do(a => store$.dispatch(a)),
            buildExpected(examDuration, examDuration - 2),
            true,
            false,
            deepEqual,
        ).then(() => matchResult = null, result => matchResult = result);

        tick(examDuration * 1000 + 1000);
        expect(matchResult).toBeNull();
    })());

    function init(initialState: State)
    {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<State, Action>(
                    reducersMap,
                    initialState ? { initialState } : {}),
                StoreDevtoolsModule.instrument({
                    maxAge: 50, //  Retain last n states
                }),
            ],
            providers: [
                ExamStartEffects,
                provideMockActions(() => actions.do(a => store$.dispatch(a))),
                { provide: MODULE_STORE_TOKEN, useExisting: Store },
                {
                    provide: ExamTimerService,
                    useValue: jasmine.createSpyObj('ExamTimerService', { getTimer: getTimerMock }),
                },
                {
                    provide: QuestionsFetchService,
                    useValue: jasmine.createSpyObj('QuestionsFetchService', { fetchQuestions: fetchQuestionsMock }),
                },
            ],
        });

        effects = TestBed.get(ExamStartEffects);
        store$ = TestBed.get(Store);
        examTimerService = TestBed.get(ExamTimerService);
        questionsFetchService = TestBed.get(QuestionsFetchService);
    }

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
                    ...exam,
                    duration, // seconds
                } as ExamInfo, false),
            },
            questions: null,
        });
    }

    function buildExpected(timerStart: number, timerEnd: number = 0)
    {
        let start = timerStart;
        const expected: Action[] = [
            new QuestionsDataAction({ data: new AsyncDataSer<Question[]>(questions) }),
            new QuestionsCurrentAction({ num: 1 }),
            new ExamStatusAction({ status: ExamStatus.RUNNING }),
            new NavigationGoAction({
                commands: ['../question/1'],
                relativeRouteId: startRouteId,
            }),
        ];
        for (; start >= timerEnd; --start)
            expected.push(new ExamTimeAction({ time: start }));

        if (timerEnd === 0)
        {
            expected.push(new ExamEndAction({ status: ExamStatus.TIME_ENDED }));
            expected.push(new NavigationGoAction({
                commands: ['../../result'],
                relativeRouteId: questionRouteId,
            }));
        }

        return expected;
    }
});

/**
 * Returns a timer for clocking an exam. The timer is an observable of a countdown of seconds, that completes at the end.
 * @param duration The number of seconds for the countdown.
 */
function getTimerMock(duration: number)
{
    return Observable.interval(1000).map(i => duration - i - 1).take(duration).startWith(duration);
}

function fetchQuestionsMock(questions: Question[]): Observable<AsyncDataSer<Question[]>>
{
    return Observable.of(new AsyncDataSer<Question[]>(questions));
}
