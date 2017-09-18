import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap, Action, Store, createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PageStartEffects } from './logic/effects/page-start.effects';
import { PageResultEffects } from './logic/effects/page-result.effects';
import { PageQuestionStartEffects } from './logic/effects/page-question-start.effects';
import { PageQuestionCurrentEffects } from './logic/effects/page-question-current.effects';
import { ExamStartEffects } from './logic/effects/exam-start.effects';

import { State, MODULE_STORE_TOKEN, reducers } from './logic/reducers';

import { QuestionContainer } from './containers/question/question.container';
import { ResultContainer } from './containers/result/result.container';

import { ExamTimerService } from './data/exam-timer.service';

const featureName = 'exam';

export function featureSelector(store: Store<any>)
{
    return store.select(createFeatureSelector<State>(featureName));
}

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature(featureName, reducers),
        EffectsModule.forFeature([
            PageStartEffects,
            PageResultEffects,
            PageQuestionStartEffects,
            PageQuestionCurrentEffects,
        ])
    ],
    declarations: [
        QuestionContainer,
        ResultContainer
    ],
    providers: [
        {
            provide: MODULE_STORE_TOKEN,
            useFactory: featureSelector,
            deps: [Store]
        },
        ExamTimerService
    ]
})
export class ExamModule { }
