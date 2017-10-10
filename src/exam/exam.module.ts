import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, Store, createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterOutEffects } from './logic/effects/router-out.effects';
import { RouterResultEffects } from './logic/effects/router-result.effects';
import { RouterStartEffects } from './logic/effects/router-start.effects';
import { RouterQuestionCurrentEffects } from './logic/effects/router-question-current.effects';
import { ExamStartEffects } from './logic/effects/exam-start.effects';

import { State, MODULE_STORE_TOKEN, reducers } from './logic/reducers';

import { QuestionContainer } from './containers/question/question.container';
import { ResultContainer } from './containers/result/result.container';

import { ExamTimerService } from './data/exam-timer.service';
import { ExamRoutingModule } from './exam-routing.module';
import { WrapperContainer } from './containers/wrapper/wrapper.container';
import { StartContainer } from './containers/start/start.container';
import { ExamFetchService } from './data/exam-fetch.service';
import { QuestionsFetchService } from './data/questions-fetch.service';
import { ExamEndEffects } from './logic/effects/exam-end.effects';
import { ExamEvalService } from './data/exam-eval.service';
import { Sec2TimePipe } from './pipes/sec2time.pipe';

/**
 * Module name.
 */
const featureName = 'exam';

/**
 * Function to select the sub-store for this module from the global store.
 * It is exported only because of AoT.
 * See more on [[MODULE_STORE_TOKEN]].
 * @param store
 */
export function featureSelector(store: Store<any>): Store<State>
{
    return store.select<State>(createFeatureSelector<State>(featureName));
}

@NgModule({
    id: featureName,
    imports: [
        CommonModule,
        NgbModule,
        ExamRoutingModule,
        StoreModule.forFeature(featureName, reducers),
        EffectsModule.forFeature([
            RouterOutEffects,
            RouterResultEffects,
            RouterStartEffects,
            RouterQuestionCurrentEffects,
            ExamStartEffects,
            ExamEndEffects,
        ]),
    ],
    declarations: [
        WrapperContainer,
        StartContainer,
        QuestionContainer,
        ResultContainer,
        Sec2TimePipe,
    ],
    exports: [
    ],
    providers: [
        {
            provide: MODULE_STORE_TOKEN,
            useFactory: featureSelector,
            deps: [Store],
        },
        ExamTimerService,
        ExamFetchService,
        ExamEvalService,
        QuestionsFetchService,
    ],
})
export class ExamModule {}
