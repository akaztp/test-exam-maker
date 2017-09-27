import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, Store, createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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

const featureName = 'exam';

export function featureSelector(store: Store<any>): Store<State>
{
    return store.select<State>(createFeatureSelector<State>(featureName));
}

@NgModule({ id: 'ExamModule',
    imports: [
        CommonModule,
        ExamRoutingModule,
        StoreModule.forFeature(featureName, reducers),
        EffectsModule.forFeature([
            RouterOutEffects,
            RouterResultEffects,
            RouterStartEffects,
            RouterQuestionCurrentEffects,
            ExamStartEffects,
        ])
    ],
    declarations: [
        QuestionContainer,
        ResultContainer
    ],
    exports: [
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
