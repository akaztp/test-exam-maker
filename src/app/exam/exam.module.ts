import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap, Action } from '@ngrx/store';

import { reducer as examReducer } from './logic/exam/exam.reducer';
import { reducer as questionsReducer } from './logic/questions/questions.reducer';

const reducers: ActionReducerMap<{}, Action> = {
	exam: examReducer,
	questions: questionsReducer,
}

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('exam', reducers),
	],
	declarations: []
})
export class ExamModule { }
