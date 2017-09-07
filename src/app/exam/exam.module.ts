import { NgModule, InjectionToken  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap, Action, Store, createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PageStartEffects } from './logic/effects/page-start.effects';
import { PageResultEffects } from './logic/effects/page-result.effects';
import { PageQuestionStartEffects } from './logic/effects/page-question-start.effects';
import { PageQuestionCurrentEffects } from './logic/effects/page-question-current.effects';
import { State, MODULE_STORE_TOKEN, reducers } from './logic/reducers';
import { QuestionComponent } from './pages/question/question.component';
import { ResultComponent } from './pages/result/result.component';

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
		QuestionComponent,
		ResultComponent
	],
	providers: [
		{
			provide: MODULE_STORE_TOKEN,
			useFactory: featureSelector,
			deps: [Store]
		}
	]
})
export class ExamModule { }
