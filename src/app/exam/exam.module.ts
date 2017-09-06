import { NgModule, InjectionToken  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap, Action, Store, createFeatureSelector } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { InitEffects } from './logic/exam/init.effects';
import { State, MODULE_STORE_TOKEN, reducers } from './logic/reducers';

const featureName = 'exam';

export function featureSelector(store: Store<any>)
{
	return store.select(createFeatureSelector<State>(featureName));
}

@NgModule({ 
	imports: [
		CommonModule,
		StoreModule.forFeature(featureName, reducers),
		EffectsModule.forFeature([InitEffects])
	],
	declarations: [],
	providers: [
		{
			provide: MODULE_STORE_TOKEN,
			useFactory: featureSelector,
			deps: [Store]
		}
	]
})
export class ExamModule { }
