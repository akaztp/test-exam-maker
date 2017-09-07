import { TestBed } from '@angular/core/testing';
import { RouterNavigationAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from "rxjs/Observable";

import { StartComponent } from "../../pages/start/start.component";
import { UserStatusAction, UserInputAction } from "../actions/user.actions";
import { UserStatus } from "../reducers/user.reducer";
import { PageStartEffects } from './page-start.effects';

describe('Logic/User/' + PageStartEffects.name, () =>
{
	let effects: PageStartEffects;
	let actions: Observable<any>;

	beforeEach(() =>
	{
		TestBed.configureTestingModule({
			providers: [
				PageStartEffects,
				provideMockActions(() => actions),
			]
		});

		effects = TestBed.get(PageStartEffects);
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
