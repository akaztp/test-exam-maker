import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RouterNavigationAction } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { RouterStoreSerModule, RouterStateSer, RouterNodeSer, NavigationGoAction } from 'router-store-ser';

import { RouterStartEffects } from './router-start.effects';
import { ExamStartAction } from '../actions/exam.actions';
import { questionRouterState, examRouterState } from '../../utils/router-state-samples';
import { ROUTER_ACTIVE } from '../../../utils/router-state-extension';
import { startRouteId } from '../../exam-routing.module';
import { failOnObsError } from '../../utils/jasmine-fail-observer';

describe('Exam/Logic/' + RouterStartEffects.name, () =>
{
    let effects: RouterStartEffects;
    let actions: Observable<any>;

    beforeEach(() =>
        {
            TestBed.configureTestingModule(
                {
                    imports: [
                        StoreModule.forRoot<{}, { type: any }>({}, {}),
                        EffectsModule.forRoot([]),
                        RouterStoreSerModule
                    ],
                    providers: [
                        RouterStartEffects,
                        provideMockActions(() => actions),
                        { provide: Router, useValue: {} },
                    ]
                });

            effects = TestBed.get(RouterStartEffects);
        });

    it('should emit no action', () =>
        {
            const routerAction: RouterNavigationAction<RouterStateSer> =
                {
                    type: ROUTER_ACTIVE as any,
                    payload: {
                        routerState: questionRouterState(1), // just get a different route from the 'start' route
                        event: null
                    }
                };

            actions = hot('a', { a: routerAction });
            const expected = hot('', {});

            expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
        });

    it('should emit two actions', () =>
        {
            const routerState = examRouterState();
            routerState.url += '/start';
            const parent: RouterNodeSer = routerState.root.children[0]; // get to the 'exam' state level
            parent.children = [
                {
                    configPath: 'start',
                    data: {
                        uid: startRouteId
                    },
                    params: {},
                    children: [],
                }];

            const routerAction: RouterNavigationAction<RouterStateSer> =
                {
                    type: ROUTER_ACTIVE as any,
                    payload: {
                        routerState: routerState,
                        event: null
                    }
                };

            actions = hot('a', { a: routerAction });
            const expected = hot('(ab)',
                {
                    a: new ExamStartAction(),
                    b: new NavigationGoAction(
                        {
                            commands: ['../question', 1],
                            relativeRouteId: startRouteId
                        }),
                });

            expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
        });

});
