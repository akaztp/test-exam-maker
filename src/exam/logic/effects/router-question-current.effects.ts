import { Injectable, Inject } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { QuestionsCurrentAction } from '../actions/questions.actions';
import { questionRouteId, questionParamNum } from '../../exam-routing.module';
import { RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer } from 'router-store-ser';

/**
  * Business logic implementation:
  * - ROUTER_NAVIGATION(EXAM_QUESTION, num), if(num!=null)
  *   - \>QUESTIONS_CURRENT(num)
 */
@Injectable()
export class RouterQuestionCurrentEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        private actions$: Actions,
        @Inject(RouterStateSerializer)
        protected routerStateSerializer: CustomRouterStateSerializer,
    )
    {
        this.effect$ = this.actions$.ofType<RouterNavigationAction<RouterStateSer>>(ROUTER_NAVIGATION)
            .map<RouterNavigationAction<RouterStateSer>, number>(
                (action) =>
                {
                    let num = NaN;
                    const node = this.routerStateSerializer.findNodeById(action.payload.routerState.root, questionRouteId);
                    if (node)
                        num = Number.parseInt(node.params[questionParamNum]);
                    return num;
                })
            .filter(num => !isNaN(num))
            .map(num => new QuestionsCurrentAction({ num }));
    }
}
