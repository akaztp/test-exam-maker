import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { RouterNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from "rxjs/Observable";

import { PageQuestionCurrentEffects } from './page-question-current.effects';
import { QuestionComponent } from "../../pages/question/question.component";
import { ExamStatus, initialState as examInitialState } from "../reducers/exam.reducer";
import { QuestionsCurrentAction } from "../actions/questions.actions";

describe('Exam/Logic/' + PageQuestionCurrentEffects.name, () =>
{
	let effects: PageQuestionCurrentEffects;
	let actions: Observable<any>;

	beforeEach(() =>
	{
		TestBed.configureTestingModule({
			providers: [
				PageQuestionCurrentEffects,
				provideMockActions(() => actions),
			]
		});

		effects = TestBed.get(PageQuestionCurrentEffects);
	});

	it('should emit no action', () =>
	{
		const routerAction = {
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

		const expected = cold('', {});

		expect(effects.effect$).toBeObservable(expected);
	});

	it('should emit one action', () =>
	{
		const routerAction = {
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

		const expected = cold('a', {
			a: new QuestionsCurrentAction({
				num: Number.parseInt(routerAction.payload.routerState.root.firstChild.params['num'])
			})
		});

		expect(effects.effect$).toBeObservable(expected);
	});

});
