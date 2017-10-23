import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { ExamEndAction } from '../actions/exam.actions';
import { ExamStatus, State as ExamState } from '../state/exam.state';
import { resultRouteId } from '../../exam-routing.module';
import { RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer } from 'router-store-ser';
import { State, MODULE_STORE_TOKEN } from '../state/state';

/**
 * Business logic implementation:
 * - ROUTER_NAVIGATION(EXAM_RESULT)
 *   - \>EXAM_END(ENDED), if needed (state.exam.status!=ENDED && !=TIME_ENDED)
 */
@Injectable()
export class RouterResultEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        protected actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<State>,
        @Inject(RouterStateSerializer)
        protected routerStateSerializer: CustomRouterStateSerializer,
    )
    {
        const exam$: Store<ExamState> = this.store$.select(state => state.exam);

        this.effect$ = this.actions$.ofType<RouterNavigationAction<RouterStateSer>>(ROUTER_NAVIGATION)
            .withLatestFrom(
                exam$,
                (action, exam) =>
                {
                    const node = this.routerStateSerializer.findNodeById(action.payload.routerState.root, resultRouteId);
                    if (node && exam.status !== ExamStatus.ENDED && exam.status !== ExamStatus.TIME_ENDED)
                        return action;

                    return null;
                },
            )
            .filter(action => action != null)
            .map(action => new ExamEndAction({ status: ExamStatus.ENDED }));
    }
}
