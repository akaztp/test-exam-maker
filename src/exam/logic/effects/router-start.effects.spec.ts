import { Router } from '@angular/router';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { StoreModule, Action } from '@ngrx/store';
import { RouterNavigationAction } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { RouterStoreSerModule, RouterStateSer, RouterNodeSer } from 'router-store-ser';

import { RouterStartEffects } from './router-start.effects';
import { ExamStatusAction, ExamDataAction } from '../actions/exam.actions';
import { questionRouterState, examRouterState } from '../../utils/router-state-samples';
import { ROUTER_ACTIVE } from '../../../utils/router-state-extension';
import { startRouteId } from '../../exam-routing.module';
import { ExamStatus } from '../state/exam.state';
import { createExam } from '../../utils/exam-samples';
import { ExamFetchService } from '../../data/exam-fetch.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { QuestionsDataAction } from '../actions/questions.actions';
import { failOnObsError } from '../../utils/jasmine-fail-observer';
import { ExamInfo } from '../../models/exam-info';
import { matchObservable } from 'match-observable';
import { deepEqual } from '../../utils/deep-equal';

describe('Exam/Logic/' + RouterStartEffects.name, () =>
{
    let effects: RouterStartEffects;
    let actions: Observable<any>;
    let examFetchServiceSpy: jasmine.SpyObj<ExamFetchService> = null;
    const { exam } = createExam('1');

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
            {
                imports: [
                    StoreModule.forRoot<{}, Action>({}, {}),
                    EffectsModule.forRoot([]),
                    RouterStoreSerModule,
                ],
                providers: [
                    RouterStartEffects,
                    provideMockActions(() => actions),
                    { provide: Router, useValue: {} },
                    {
                        provide: ExamFetchService,
                        useValue: jasmine.createSpyObj(
                            'ExamFetchService',
                            {
                                fetchExam: Observable.concat(
                                    Observable.of(AsyncDataSer.loading<ExamInfo>()),
                                    Observable.of(new AsyncDataSer<ExamInfo>(exam, false)),
                                ),
                            }),
                    },
                ],
            });

        effects = TestBed.get(RouterStartEffects);
        examFetchServiceSpy = TestBed.get(ExamFetchService);
    });

    it('should emit no action', () =>
    {
        const routerAction: RouterNavigationAction<RouterStateSer> = {
            type: ROUTER_ACTIVE as any,
            payload: {
                routerState: questionRouterState(1), // just get a different route from the 'start' route
                event: null,
            },
        };

        actions = cold('a', { a: routerAction });
        const expected = cold('', {});

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });

    it('should fetch exam data and emit actions', fakeAsync(() =>
    {
        const routerState = examRouterState();
        routerState.url += '/start';
        const parent: RouterNodeSer = routerState.root.children[0]; // get to the 'exam' state level
        parent.children = [
            {
                configPath: 'start',
                data: {
                    uid: startRouteId,
                },
                params: {},
                children: [],
            },
        ];

        const routerAction: RouterNavigationAction<RouterStateSer> = {
            type: ROUTER_ACTIVE as any,
            payload: {
                routerState,
                event: null,
            },
        };
        actions = Observable.of(routerAction);

        const expected: Action[] = [
            new ExamStatusAction({ status: ExamStatus.OFF }),
            new ExamDataAction({ data: new AsyncDataSer(exam) }),
            new QuestionsDataAction({ data: null }),
            new ExamStatusAction({ status: ExamStatus.READY }),
        ];
        let matchResult: string;
        matchObservable<Action>(
            effects.effect$.catch(failOnObsError),
            expected,
            true,
            false,
            deepEqual,
        ).then(() => matchResult = null, result => matchResult = result);

        flush();
        expect(matchResult).toBeNull();
        expect(examFetchServiceSpy.fetchExam).toHaveBeenCalled();
    }));
});
