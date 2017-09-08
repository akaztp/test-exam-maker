import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { RouterNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from "rxjs/Observable";

import { reducers, State, MODULE_STORE_TOKEN } from '../reducers';
import { ExamStartEffects } from './exam-start.effects';
import { StartComponent } from "../../../pages/start/start.component";
import { ExamStatus, initialState as examInitialState } from "../reducers/exam.reducer";
import { ExamStatusAction, ExamStartAction, ExamEndAction, ExamTimeAction } from "../actions/exam.actions";
import { ExamTimerService } from "../../data/exam-timer.service";
import { AsyncDataSer } from "../../../data/asyncData";
import { ExamInfo } from "../../models/exam-info";
import { deepEqual } from "assert";

describe('Exam/Logic/' + ExamStartEffects.name, () =>
{
	let effects: ExamStartEffects;
	let actions: Observable<any>;
	let store: Store<State>;
	let examTimerService: ExamTimerService;
	const examDuration = 5; // seconds, expected observable below has this hardcoded

	function init(initialState)
	{
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot<State, Action>(reducers,
					initialState ? { initialState: initialState } : {}),
			],
			providers: [
				ExamStartEffects,
				provideMockActions(() => actions),
				{ provide: MODULE_STORE_TOKEN, useExisting: Store },
				ExamTimerService,
			]
		});

		effects = TestBed.get(ExamStartEffects);
		store = TestBed.get(Store);
		examTimerService = TestBed.get(ExamTimerService);
	}

	it('should not emit actions when exam.status != READY ', () =>
	{
		init({ exam: { ...examInitialState, status: ExamStatus.OFF } });
		actions = hot('a', { a: new ExamStartAction() });
		const expected = cold('', { });

		expect(effects.effect$).toBeObservable(expected);
	});


	it('should emit timer actions until expired', (done) =>
	{
		fakeAsync(() =>
		{
			init({
				exam: {
					...examInitialState,
					status: ExamStatus.READY,
					data: new AsyncDataSer({
						duration: examDuration, // seconds
					} as ExamInfo, false),
				}
			});
			actions = Observable.of(new ExamStartAction());
			const expected = [
				new ExamStatusAction({ status: ExamStatus.RUNNING }),
				new ExamTimeAction({ time: 5 }),
				new ExamTimeAction({ time: 4 }),
				new ExamTimeAction({ time: 3 }),
				new ExamTimeAction({ time: 2 }),
				new ExamTimeAction({ time: 1 }),
				new ExamEndAction({ status: ExamStatus.TIME_ENDED }),
			];
			let expectedStep = 0;

			effects.effect$.subscribe(
				(value) =>
				{
					expect(value).toEqual(expected[expectedStep]);
					expectedStep++;
				},
				(error) => fail('Effects observable errored unexpectedly. Error: ' + error.toString()),
				() =>
				{ // because the above actions observable does complete
					if (expectedStep === expected.length)
					{
						done();
						flush();
					}
					else
						fail('Effects observable completed unexpectedly. '
							+ (expectedStep < expected.length
								? 'Missing values from effects observable.'
								: 'Too many values on effects observable.'));
				}
			);
			tick(examDuration * 1000);
			flush();
		})();
	});
});
