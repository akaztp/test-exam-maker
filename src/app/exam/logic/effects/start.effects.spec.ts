import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { RouterNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from "rxjs/Observable";

import { StartEffects } from './start.effects';
import { QuestionComponent } from "../../pages/question/question.component";
import { ExamStatus, initialState as examInitialState } from "../reducers/exam.reducer";
import { ExamStartAction } from "../actions/exam.actions";

describe('Exam/Logic/Exam/StartEffects', () =>
{
	let effects: StartEffects;
	let actions: Observable<any>;

	beforeEach(() =>
	{
		TestBed.configureTestingModule({
			providers: [
				StartEffects,
				provideMockActions(() => actions),
			]
		});

		effects = TestBed.get(StartEffects);
	});

	it('should emit no action', () =>
	{
		const routerAction: any = { 
			type: ROUTER_NAVIGATION,
			payload: {
				routerState: {
					root: {
						firstChild: {
							component: QuestionComponent,
							params: { num: '1' },
						}
					}
				}
			}
		};

		actions = hot('a', { a: routerAction });

		const expected = cold('', {});

		expect(effects.effect$).toBeObservable(expected);
	});

	it('should emit one action', () =>
	{
		const routerAction: any = {
			type: ROUTER_NAVIGATION,
			payload: {
				routerState: {
					root: {
						firstChild: {
							component: QuestionComponent,
							params: { num: null },
						}
					}
				}
			}
		};

		actions = hot('a', { a: routerAction });

		const expected = cold('a', { a: new ExamStartAction() });

		expect(effects.effect$).toBeObservable(expected);
	});

});
