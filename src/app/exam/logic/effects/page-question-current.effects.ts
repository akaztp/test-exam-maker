import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { QuestionComponent } from '../../pages/question/question.component';
import { QuestionsCurrentAction } from "../actions/questions.actions";

@Injectable()
export class PageQuestionCurrentEffects
{
	@Effect()
	public effect$: Observable<Action>;

	constructor(
		private actions$: Actions,
	)
	{
		this.effect$ = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
			.filter(action => action.payload.routerState.root.firstChild.component == QuestionComponent
					&& !isNaN(Number.parseInt(action.payload.routerState.root.firstChild.params['num'])))
			.map(action =>
				new QuestionsCurrentAction({
					num: Number.parseInt(action.payload.routerState.root.firstChild.params['num'])
				}));
	}
}
