import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { StartComponent } from '../../../pages/start/start.component';
import { ExamStatusAction } from './exam.actions';
import { ExamStatus, State as ExamState } from './exam.reducer';
import { MODULE_STORE_TOKEN, State } from "../reducers";

@Injectable()
export class InitEffects
{
	@Effect()
	public effect$: Observable<Action>;

	constructor(
		private actions$: Actions,
		@Inject(MODULE_STORE_TOKEN)
		private store: Store<State>
	)
	{
		const exam$: Store<ExamState> = this.store.select(state => state.exam);

		this.effect$ = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
			.withLatestFrom(exam$, (action, exam) =>
			{
				if (action.payload.routerState.root.firstChild.component == StartComponent
					&& exam.status != ExamStatus.OFF)
					return action;

				return null;
			})
			.filter(action => action != null)
			.map(action => new ExamStatusAction({ status: ExamStatus.OFF }));

	}
}
