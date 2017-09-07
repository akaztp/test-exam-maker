﻿import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { RouterNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from "rxjs/Observable";

import { reducers, State, MODULE_STORE_TOKEN } from '../reducers';
import { InitEffects } from './init.effects';
import { StartComponent } from "../../../pages/start/start.component";
import { ExamStatus, initialState as examInitialState } from "../reducers/exam.reducer";
import { ExamStatusAction } from "../actions/exam.actions";

describe('Exam/Logic/Exam/InitEffects', () =>
{
	let effects: InitEffects;
	let actions: Observable<any>;
	let store: Store<State>;

	it('should not emit actions', () =>
	{
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot<State, Action>(reducers),
			],
			providers: [
				InitEffects,
				provideMockActions(() => actions),
				{ provide: MODULE_STORE_TOKEN, useExisting: Store }
			]
		});

		effects = TestBed.get(InitEffects);
		store = TestBed.get(Store);

		const routerAction: any = {
			type: ROUTER_NAVIGATION,
			payload: {
				routerState: {
					root: {
						firstChild: {
							component: StartComponent
						}
					}
				}
			}
		};

		actions = hot('a', { a: routerAction });

		const expected = cold('', { });

		expect(effects.effect$).toBeObservable(expected);
	});


	it('should emit one action', () =>
	{
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot<State, Action>(reducers, {
					initialState: { exam: { ...examInitialState, status: ExamStatus.ENDED } }
				}),
			],
			providers: [
				InitEffects,
				provideMockActions(() => actions),
				{ provide: MODULE_STORE_TOKEN, useExisting: Store }
			]
		});

		effects = TestBed.get(InitEffects);
		store = TestBed.get(Store);

		const routerAction: any = { 
			type: ROUTER_NAVIGATION,
			payload: {
				routerState: {
					root: {
						firstChild: {
							component: StartComponent
						}
					}
				}
			}
		};

		actions = hot('a', { a: routerAction });

		const expected = cold('a', { a: new ExamStatusAction({ status: ExamStatus.OFF })});

		expect(effects.effect$).toBeObservable(expected);
	});
});