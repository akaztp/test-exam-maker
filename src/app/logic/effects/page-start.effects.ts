import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { UserStatusAction, UserInputAction } from '../actions/user.actions';
import { UserStatus } from "../reducers/user.reducer";
import { StartComponent } from '../../pages/start/start.component';

@Injectable()
export class PageStartEffects
{
	@Effect()
	public effect$: Observable<Action> = this.actions$.ofType(ROUTER_NAVIGATION)
		.filter((action: RouterNavigationAction) => action.payload.routerState.root.firstChild.component == StartComponent)
		.mergeMap(action => Observable.of(...[
			new UserStatusAction({ status: UserStatus.NONE }),
			new UserInputAction({ username: '' }),
		]));

	constructor(
		private actions$: Actions
	) { }
}
