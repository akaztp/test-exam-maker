import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { reducers, State, MODULE_STORE_TOKEN } from '../reducers';
import { PageResultEffects } from './page-result.effects';
import { ResultContainer } from '../../containers/result/result.container';
import { ExamStatus, initialState as examInitialState } from '../reducers/exam.reducer';
import { ExamStatusAction, ExamEndAction } from '../actions/exam.actions';

describe('Exam/Logic/' + PageResultEffects.name, () =>
{
    let effects: PageResultEffects;
    let actions: Observable<any>;
    let store: Store<State>;
    const routerAction = {
        type: ROUTER_NAVIGATION,
        payload: {
            routerState: {
                root: {
                    firstChild: {
                        component: ResultContainer
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
                PageResultEffects,
                provideMockActions(() => actions),
                { provide: MODULE_STORE_TOKEN, useExisting: Store }
            ]
        });

        effects = TestBed.get(PageResultEffects);
        store = TestBed.get(Store);
    }

    it('should not emit actions when exam.status is ENDED', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.ENDED } });
        actions = hot('a', { a: routerAction });
        const expected = cold('', {});

        expect(effects.effect$).toBeObservable(expected);
    });

    it('should not emit actions when exam.status is TIME_ENDED', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.TIME_ENDED } });
        actions = hot('a', { a: routerAction });
        const expected = cold('', {});

        expect(effects.effect$).toBeObservable(expected);
    });

    it('should emit one action', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.OFF } });
        actions = hot('a', { a: routerAction });
        const expected = cold('a', { a: new ExamEndAction({ status: ExamStatus.ENDED }) });

        expect(effects.effect$).toBeObservable(expected);
    });
});
