import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { Action, Store, StoreModule } from '@ngrx/store';
import { ROUTER_NAVIGATION, RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { EffectsModule } from '@ngrx/effects';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { RouterQuestionCurrentEffects } from './router-question-current.effects';
import { QuestionsCurrentAction } from '../actions/questions.actions';
import { RouterStateSer, RouterStoreSerModule, NavigationGoAction,
     RouterStateSerializer as CustomRouterStateSerializer } from 'router-store-ser';
import { startRouteId } from '../../exam-routing.module';
import { questionRouterState } from '../../utils/router-state-samples';
import { failOnObsError } from '../../utils/jasmine-fail-observer';
import { ExamStatus } from '../state/exam.state';
import { moduleNavigationCommands } from '../../module-config';
import { MODULE_STORE_TOKEN, State } from '../state/state';
import { reducersMap } from '../logic.module';

describe('Exam/Logic/' + RouterQuestionCurrentEffects.name, () =>
{
    let effects: RouterQuestionCurrentEffects;
    let actions: Observable<any>;

    it('should emit no action', () =>
    {
        init(ExamStatus.OFF);

        const routerAction: RouterNavigationAction<RouterStateSer> = {
            type: ROUTER_NAVIGATION,
            payload: {
                routerState: {
                    url: 'start',
                    root: {
                        configPath: 'start',
                        data: {
                            uid: startRouteId,
                        },
                        children: [],
                        params: {},
                    },
                },
                event: null,
            },
        };

        actions = hot('a', { a: routerAction });
        const expected = hot('', {});

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });

    it('should emit one action when on state RUNNING', () =>
    {
        init(ExamStatus.RUNNING);

        const num = 5;
        const routerAction: RouterNavigationAction<RouterStateSer> = {
            type: ROUTER_NAVIGATION,
            payload: {
                routerState: questionRouterState(num),
                event: null,
            },
        };

        actions = hot('a', { a: routerAction });
        const expected = hot('a', {
            a: new QuestionsCurrentAction({ num }),
        });

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });

    it('should emit one action when on state ENDED or TIME_ENDED', () =>
    {
        const status: ExamStatus[] = [ExamStatus.ENDED, ExamStatus.TIME_ENDED];
        status.forEach(
            (s) =>
            {
                init(s);
                const num = 5;
                const routerAction: RouterNavigationAction<RouterStateSer> = {
                    type: ROUTER_NAVIGATION,
                    payload: {
                        routerState: questionRouterState(num),
                        event: null,
                    },
                };

                actions = hot('a', { a: routerAction });
                const expected = hot('a', {
                    a: new NavigationGoAction({
                        commands: [...moduleNavigationCommands, 'result'],
                    }),
                });

                expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
            });
    });

    it('should emit one action when on other states', () =>
    {
        expect(Object.keys(ExamStatus).length).toBe(5 * 2); // the number of values in the enum * 2

        const status: ExamStatus[] = [ExamStatus.OFF, ExamStatus.READY];
        status.forEach(
            (s) =>
            {
                init(s);
                const num = 5;
                const routerAction: RouterNavigationAction<RouterStateSer> = {
                    type: ROUTER_NAVIGATION,
                    payload: {
                        routerState: questionRouterState(num),
                        event: null,
                    },
                };

                actions = hot('a', { a: routerAction });
                const expected = hot('a', {
                    a: new NavigationGoAction({
                        commands: [...moduleNavigationCommands, 'start'],
                    }),
                });

                expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
            });

    });

    function init(status: ExamStatus)
    {
        TestBed
            .resetTestingModule()
            .configureTestingModule({
                imports: [
                    StoreModule.forRoot<State, Action>(
                        reducersMap,
                        {
                            initialState: {
                                exam: {
                                    status,
                                    data: null,
                                    resultScore: null,
                                    timeLeft: 0,
                                },
                                questions: null,
                            },
                        }),
                    EffectsModule.forRoot([]),
                    RouterStoreSerModule,
                ],
                providers: [
                    RouterQuestionCurrentEffects,
                    provideMockActions(() => actions),
                    { provide: MODULE_STORE_TOKEN, useExisting: Store },
                    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
                    { provide: Router, useValue: null },
                ],
            });

        effects = TestBed.get(RouterQuestionCurrentEffects);
    }
});
