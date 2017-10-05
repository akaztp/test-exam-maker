import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StoreModule, Store, Action } from '@ngrx/store';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { RouterStateSer, RouterStoreSerModule } from 'router-store-ser';

import { reducers, State, MODULE_STORE_TOKEN } from '../reducers';
import { RouterOutEffects } from './router-out.effects';
import { ExamStatus, initialState as examInitialState } from '../reducers/exam.reducer';
import { ExamStatusAction } from '../actions/exam.actions';
import { startRouteId } from '../../../app/app-routing.module';
import { failOnObsError } from '../../utils/jasmine-fail-observer';

describe('Exam/Logic/' + RouterOutEffects.name, () =>
{
    let effects: RouterOutEffects;
    let actions: Observable<any>;
    let store: Store<State>;

    const routerAction: RouterNavigationAction<RouterStateSer> = {
        type: ROUTER_NAVIGATION,
        payload: {
            routerState: {
                url: '/start',
                root: {
                    configPath: 'start',
                    data: {
                        uid: startRouteId,
                    },
                    children: [],
                    params: [],
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
                    reducers,
                    initialState ? { initialState } : {},
                ),
                EffectsModule.forRoot([]),
                RouterStoreSerModule,
            ],
            providers: [
                RouterOutEffects,
                provideMockActions(() => actions),
                { provide: MODULE_STORE_TOKEN, useExisting: Store },
                { provide: Router, useValue: {} },
            ],
        });

        effects = TestBed.get(RouterOutEffects);
        store = TestBed.get(Store);
    }

    it('should not emit actions', () =>
    {
        init(null);
        actions = hot('a', { a: routerAction });
        const expected = hot('', {});

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });


    it('should emit one action', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.ENDED } });
        actions = hot('a', { a: routerAction });
        const expected = hot('a', { a: new ExamStatusAction({ status: ExamStatus.OFF }) });

        expect(effects.effect$.catch(failOnObsError)).toBeObservable(expected);
    });
});
