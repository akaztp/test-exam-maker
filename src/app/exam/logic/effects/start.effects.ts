import { Injectable, Inject } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { QuestionComponent } from '../../pages/question/question.component';
import { ExamStatusAction, ExamStartAction } from '../actions/exam.actions';
import { ExamStatus, State as ExamState } from '../reducers/exam.reducer';
import { MODULE_STORE_TOKEN, State } from "../reducers";

@Injectable()
export class StartEffects
{
	@Effect()  
	public effect$: Observable<Action>;

	constructor(
		private actions$: Actions,
	)
	{
		this.effect$ = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
			.filter(action =>
			{
				return action.payload.routerState.root.firstChild.component == QuestionComponent
					&& !action.payload.routerState.root.firstChild.params['num'];
			})
			.map(action => new ExamStartAction());
	}
}
