import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { ExamStatusAction } from '../actions/exam.actions';
import { ExamStatus, State as ExamState } from '../state/exam.state';
import { resultRouteId, questionRouteId } from '../../exam-routing.module';
import { RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer } from 'router-store-ser';
import { State, MODULE_STORE_TOKEN } from '../state/state';

/**
 * Business logic implementation:
 * - ROUTER_NAVIGATION(outside exam)
 *   - \>EXAM_STATUS(OFF), if needed
 */
@Injectable()
export class RouterOutEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        private actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        private store$: Store<State>,
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
                    const node = this.routerStateSerializer.findNodeById(action.payload.routerState.root, [resultRouteId, questionRouteId]);
                    if (!node && exam.status !== ExamStatus.OFF)
                        return action;

                    return null;
                },
            )
            .filter(action => action != null)
            .map(action => new ExamStatusAction({ status: ExamStatus.OFF }));
    }
}
