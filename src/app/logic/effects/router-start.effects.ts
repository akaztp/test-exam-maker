import { Injectable, Inject } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { UserStatusAction, UserInputAction } from '../actions/user.actions';
import { UserStatus } from '../reducers/user.reducer';
import { RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer } from 'router-store-ser';
import { startRouteId } from '../../app-routing.module';

/**
 * Business logic implementation:
 * - ROUTER_NAVIGATION(START)
 *   - \>USER_STATUS(NONE)
 *   - \>USER_INPUT('')
 */
@Injectable()
export class PageStartEffects
{
    @Effect()
    public effect$: Observable<Action> = this.actions$.ofType(ROUTER_NAVIGATION)
        .filter((action: RouterNavigationAction<RouterStateSer>) => (
            !!this.routerStateSerializer.findNodeById(action.payload.routerState.root, startRouteId)))
        .mergeMap(action => Observable.of(...[
            new UserStatusAction({ status: UserStatus.NONE }),
            new UserInputAction({ username: '' }),
        ]));

    constructor(
        protected actions$: Actions,
        @Inject(RouterStateSerializer)
        protected routerStateSerializer: CustomRouterStateSerializer,
    ) { }
}
