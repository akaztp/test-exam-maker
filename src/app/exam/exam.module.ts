import { NgModule, InjectionToken  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap, Action, Store, createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PageStartEffects } from './logic/effects/init.effects';
import { State, MODULE_STORE_TOKEN, reducers } from './logic/reducers';
import { QuestionComponent } from './pages/question/question.component';

const featureName = 'exam';

export function featureSelector(store: Store<any>)
{
	return store.select(createFeatureSelector<State>(featureName));
}

@NgModule({ 
	imports: [
		CommonModule,
		StoreModule.forFeature(featureName, reducers),
		EffectsModule.forFeature([PageStartEffects])
	],
	declarations: [
		QuestionComponent
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
