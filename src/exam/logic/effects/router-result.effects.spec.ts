import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { RouterStoreSerModule, RouterStateSer } from 'router-store-ser';

import { reducersMap } from '../logic.module';
import { RouterResultEffects } from './router-result.effects';
import { ExamStatus, initialState as examInitialState } from '../state/exam.state';
import { ExamEndAction } from '../actions/exam.actions';
import { resultRouteId } from '../../exam-routing.module';
import { failOnObsError } from '../../utils/jasmine-fail-observer';
import { State, MODULE_STORE_TOKEN } from '../state/state';

describe('Exam/Logic/' + RouterResultEffects.name, () =>
{
    let effects: RouterResultEffects;
    let actions: Observable<any>;
    let store$: Store<State>;
    const routerAction: RouterNavigationAction<RouterStateSer> = {
        type: ROUTER_NAVIGATION,
        payload: {
            routerState: {
                url: '/result',
                root: {
                    configPath: 'result',
                    data: {
                        uid: resultRouteId,
                    },
                    children: [],
                    params: {},
                },
            },
            event: null,
        },
    };

    function init(initialState)
    {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<State, Action>(
                    reducersMap,
                    initialState ? { initialState } : {},
                ),
                EffectsModule.forRoot([]),
                RouterStoreSerModule,
            ],
            providers: [
                RouterResultEffects,
                provideMockActions(() => actions),
                { provide: MODULE_STORE_TOKEN, useExisting: Store },
                { provide: Router, useValue: {} },
            ],
        });

        effects = TestBed.get(RouterResultEffects);
        store$ = TestBed.get(MODULE_STORE_TOKEN);
    }

    it('should not emit actions when exam.status is ENDED', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.ENDED } });
        actions = hot('a', { a: routerAction });
        const expected = hot('', {});

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });

    it('should not emit actions when exam.status is TIME_ENDED', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.TIME_ENDED } });
        actions = hot('a', { a: routerAction });
        const expected = hot('', {});

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });

    it('should emit one action', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.OFF } });
        actions = hot('a', { a: routerAction });
        const expected = hot('a', { a: new ExamEndAction({ status: ExamStatus.ENDED }) });

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });
});
