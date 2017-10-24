import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, ActionReducerMap, Action, Store, createFeatureSelector } from '@ngrx/store';

import { reducer as examReducer } from './reducers/exam.reducer';
import { reducer as questionsReducer } from './reducers/questions.reducer';
import { RouterOutEffects } from './effects/router-out.effects';
import { RouterResultEffects } from './effects/router-result.effects';
import { RouterStartEffects } from './effects/router-start.effects';
import { RouterQuestionCurrentEffects } from './effects/router-question-current.effects';
import { ExamStartEffects } from './effects/exam-start.effects';
import { ExamEndEffects } from './effects/exam-end.effects';
import { featureName } from '../module-config';
import { State, MODULE_STORE_TOKEN } from './state/state';

export const reducersMap: ActionReducerMap<State, Action> = {
    exam: examReducer,
    questions: questionsReducer,
};

/**
 * Function to select the sub-store for this module from the global store.
 * It is exported only because of AoT.
 * See more on [[MODULE_STORE_TOKEN]].
 * @param store
 */
export function featureSelector(store$: Store<any>): Store<State>
{
    return store$.select<State>(createFeatureSelector<State>(featureName));
}

@NgModule({
    imports: [
        StoreModule.forFeature(featureName, reducersMap),
        EffectsModule.forFeature([
            RouterOutEffects,
            RouterResultEffects,
            RouterStartEffects,
            RouterQuestionCurrentEffects,
            ExamStartEffects,
            ExamEndEffects,
        ]),
    ],
    providers: [
        {
            provide: MODULE_STORE_TOKEN,
            useFactory: featureSelector,
            deps: [Store],
        },
    ],
})
export class LogicModule {}
