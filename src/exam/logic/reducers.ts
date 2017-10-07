import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action, Store } from '@ngrx/store';

import { reducer as examReducer, State as ExamState } from './reducers/exam.reducer';
import { reducer as questionsReducer, State as QuestionsState } from './reducers/questions.reducer';

export interface State
{
    exam: ExamState;
    questions: QuestionsState;
}

/**
 * This token is used for providing the store fragment that corresponds to this ngModule.
 * So, on this module asking the injector for Store should always ask for this token.
 */
export const MODULE_STORE_TOKEN = new InjectionToken<Store<State>>('ModuleStore');

export const reducers: ActionReducerMap<State, Action> = {
    exam: examReducer,
    questions: questionsReducer,
};
