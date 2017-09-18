import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { reducers, State, MODULE_STORE_TOKEN } from '../reducers';
import { PageStartEffects } from './page-start.effects';
import { StartContainer } from '../../../app/containers/start/start.container';
import { ExamStatus, initialState as examInitialState } from '../reducers/exam.reducer';
import { ExamStatusAction } from '../actions/exam.actions';

describe('Exam/Logic/' + PageStartEffects.name, () =>
{
    let effects: PageStartEffects;
    let actions: Observable<any>;
    let store: Store<State>;
    const routerAction = {
        type: ROUTER_NAVIGATION,
        payload: {
            routerState: {
                root: {
                    firstChild: {
                        component: StartContainer
                    }
                }
            }
        }
    };

    function init(initialState)
    {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<State, Action>(reducers,
                    initialState ? { initialState: initialState } : {}),
            ],
            providers: [
                PageStartEffects,
                provideMockActions(() => actions),
                { provide: MODULE_STORE_TOKEN, useExisting: Store }
            ]
        });

        effects = TestBed.get(PageStartEffects);
        store = TestBed.get(Store);
    }

    it('should not emit actions', () =>
    {
        init(null);
        actions = hot('a', { a: routerAction });
        const expected = cold('', {});

        expect(effects.effect$).toBeObservable(expected);
    });


    it('should emit one action', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.ENDED } });
        actions = hot('a', { a: routerAction });
        const expected = cold('a', { a: new ExamStatusAction({ status: ExamStatus.OFF }) });

        expect(effects.effect$).toBeObservable(expected);
    });
});
