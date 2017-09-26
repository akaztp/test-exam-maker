import { Inject, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import { ExamStartAction } from '../actions/exam.actions';
import { startRouteId } from '../../exam-routing.module';
import { ROUTER_ACTIVE } from '../../../utils/router-state-extension';
import { RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer, NavigationGoAction } from 'router-store-ser';

@Injectable()
export class RouterStartEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        protected actions$: Actions,
        @Inject(RouterStateSerializer)
        protected routerStateSerializer: CustomRouterStateSerializer
    )
    {
        this.effect$ = this.actions$.ofType<RouterNavigationAction<RouterStateSer>>(ROUTER_ACTIVE)
            .filter(action => !!this.routerStateSerializer.findNodeById(action.payload.routerState.root, startRouteId))
            .mergeMap(action =>
            {
                return Observable.of(...[
                    new ExamStartAction(),
                    new NavigationGoAction({
                        commands: ['../question', 1],
                        relativeRouteId: startRouteId
                    })
                ]);
            });
    }
}
