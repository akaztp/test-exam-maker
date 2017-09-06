import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action, Store } from '@ngrx/store';

import { reducer as examReducer, State as ExamState } from './exam/exam.reducer';
import { reducer as questionsReducer, State as QuestionsState } from './questions/questions.reducer';

export interface State
{
	exam: ExamState,
	questions: QuestionsState,
}

export const MODULE_STORE_TOKEN = new InjectionToken<Store<State>>('ModuleStore');

export const reducers: ActionReducerMap<State, Action> = {
	exam: examReducer,
	questions: questionsReducer,
}
