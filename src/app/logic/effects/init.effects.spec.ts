import { TestBed } from '@angular/core/testing';
import { RouterNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from "rxjs/Observable";

import { StartComponent } from "../../pages/start/start.component";
import { UserStatusAction, UserInputAction } from "../actions/user.actions";
import { UserStatus } from "../reducers/user.reducer";
import { InitEffects } from './init.effects';

describe('Logic/User/InitEffects', () =>
{
	let effects: InitEffects;
	let actions: Observable<any>;

	beforeEach(() =>
	{
		TestBed.configureTestingModule({
			providers: [
				InitEffects,
				provideMockActions(() => actions),
			]
		});

		effects = TestBed.get(InitEffects);
	});

	it('should work', () =>
	{
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

		const expected = cold('(ab)', {
			a: new UserStatusAction({ status: UserStatus.NONE }),
			b: new UserInputAction({ username: '' }),
		});

		expect(effects.effect$).toBeObservable(expected);
	});
});
