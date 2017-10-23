import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { NavigationGoAction, RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer } from 'router-store-ser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { QuestionsCurrentAction } from '../actions/questions.actions';
import { questionRouteId, questionParamNum } from '../../exam-routing.module';
import { ExamStatus } from '../state/exam.state';
import { moduleNavigationCommands } from '../../module-config';
import { State, MODULE_STORE_TOKEN } from '../state/state';

/**
  * Business logic implementation:
  * - ROUTER_NAVIGATION(EXAM_QUESTION, num)
  *   - If (state.exam.status==RUNNING && num)
  *     - \>QUESTIONS_CURRENT(num)
  *   - else if (state.exam.status==ENDED || ==TIME_ENDED && num)
  *     - \>NAVIGATION_GO(EXAM_RESULT)
  *   - else
  *     - \>NAVIGATION_GO(EXAM_START)
 */
@Injectable()
export class RouterQuestionCurrentEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        private actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<State>,
        @Inject(RouterStateSerializer)
        protected routerStateSerializer: CustomRouterStateSerializer,
    )
    {
        const examStatus$: Store<ExamStatus> = this.store$.select(state => state.exam.status);

        this.effect$ = this.actions$.ofType<RouterNavigationAction<RouterStateSer>>(ROUTER_NAVIGATION)
            .map<RouterNavigationAction<RouterStateSer>, number>(
            (action) =>
            {
                let num = null;
                const node = this.routerStateSerializer.findNodeById(action.payload.routerState.root, questionRouteId);
                if (node)
                    num = Number.parseInt(node.params[questionParamNum]);
                return num;
            })
            .filter(n => n !== null)
            .withLatestFrom(examStatus$)
            .map(
                ([num, examStatus]) =>
                {
                    if (examStatus === ExamStatus.RUNNING && !isNaN(num))
                        return new QuestionsCurrentAction({ num });
                    else if ((examStatus === ExamStatus.ENDED || examStatus === ExamStatus.TIME_ENDED) && !isNaN(num))
                        return new NavigationGoAction({
                            commands: [...moduleNavigationCommands, 'result'],
                        });
                    else
                        return new NavigationGoAction({
                            commands: [...moduleNavigationCommands, 'start'],
                        });
                });
    }
}
