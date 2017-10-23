import { Inject, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import { ExamStatusAction, ExamDataAction } from '../actions/exam.actions';
import { startRouteId } from '../../exam-routing.module';
import { ROUTER_ACTIVE } from '../../../utils/router-state-extension';
import { RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer } from 'router-store-ser';
import { ExamStatus } from '../state/exam.state';
import { ExamFetchService } from '../../data/exam-fetch.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { QuestionsDataAction } from '../actions/questions.actions';

/**
 * Business logic implementation:
 * - ROUTER_NAVIGATION(EXAM_START)
 *   - \>EXAM_STATUS(OFF)
 *   - Fetch exam data, then:
 *     - \>EXAM_DATA()
 *     - \>QUESTIONS_DATA(empty)
 *     - \>EXAM_STATUS(READY)
 */
@Injectable()
export class RouterStartEffects
{
    @Effect()
    public effect$: Observable<Action>;

    constructor(
        protected actions$: Actions,
        @Inject(RouterStateSerializer)
        protected routerStateSerializer: CustomRouterStateSerializer,
        protected examFetchService: ExamFetchService,
    )
    {
        this.effect$ = this.actions$.ofType<RouterNavigationAction<RouterStateSer>>(ROUTER_ACTIVE)
            .filter(action => !!this.routerStateSerializer.findNodeById(action.payload.routerState.root, startRouteId))
            .mergeMap(
                (action) =>
                {
                    return Observable.concat(
                        Observable.of(new ExamStatusAction({ status: ExamStatus.OFF })),
                        this.examFetchService.fetchExam()
                            .filter(adata => AsyncDataSer.hasData(adata, true))
                            .mergeMap(
                                (adata) =>
                                {
                                    return Observable.of(...[
                                        new ExamDataAction({ data: adata }),
                                        new QuestionsDataAction({ data: null }),
                                        new ExamStatusAction({ status: ExamStatus.READY }),
                                    ]);
                                }));
                });
    }
}
