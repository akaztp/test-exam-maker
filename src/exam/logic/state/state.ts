import { InjectionToken } from '@angular/core';
import { State as ExamState } from './exam.state';
import { State as QuestionsState } from './questions.state';
import { Store } from '@ngrx/store';

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
