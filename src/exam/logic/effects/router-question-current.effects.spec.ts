import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { RouterQuestionCurrentEffects } from './router-question-current.effects';
import { QuestionsCurrentAction } from '../actions/questions.actions';
import { RouterStateSer, RouterStoreSerModule } from 'router-store-ser';
import { questionRouteId, questionParamNum } from '../../exam-routing.module';
import { questionRouterState } from '../../utils/router-state-samples';
import { failOnObsError } from '../../utils/jasmine-fail-observer';

describe('Exam/Logic/' + RouterQuestionCurrentEffects.name, () =>
{
    let effects: RouterQuestionCurrentEffects;
    let actions: Observable<any>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<{}, { type: any }>({}, {}),
                EffectsModule.forRoot([]),
                RouterStoreSerModule
            ],
            providers: [
                RouterQuestionCurrentEffects,
                provideMockActions(() => actions),
                { provide: Router, useValue: {} },
            ]
        });

        effects = TestBed.get(RouterQuestionCurrentEffects);
    });

    it('should emit no action', () =>
    {
        const routerAction: RouterNavigationAction<RouterStateSer> = {
            type: ROUTER_NAVIGATION,
            payload: {
                routerState: {
                    url: '/question',
                    root: {
                        configPath: 'question/:' + questionParamNum,
                        data: {
                            uid: questionRouteId
                        },
                        children: [],
                        params: { num: null },
                    }
                },
                event: null
            }
        };

        actions = hot('a', { a: routerAction });
        const expected = hot('', {});

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });

    it('should emit one action', () =>
    {
        const num = 5;
        const routerAction: RouterNavigationAction<RouterStateSer> = {
            type: ROUTER_NAVIGATION,
            payload: {
                routerState: questionRouterState(num),
                event: null
            }
        };

        actions = hot('a', { a: routerAction });
        const expected = hot('a', {
            a: new QuestionsCurrentAction({
                num: num
            })
        });

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });
});
