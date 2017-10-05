import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import { UserStatusAction, UserInputAction } from '../actions/user.actions';
import { UserStatus } from '../reducers/user.reducer';
import { PageStartEffects } from './router-start.effects';
import { RouterStateSer, RouterStoreSerModule } from 'router-store-ser';
import { startRouteId } from '../../app-routing.module';

describe('App/Logic/' + PageStartEffects.name, () =>
{
    let effects: PageStartEffects;
    let actions: Observable<any>;

    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<{}, { type: any }>({}, {}), // dependency of RouterStoreSerModule
                EffectsModule.forRoot([]),
                RouterStoreSerModule,
            ],
            providers: [
                PageStartEffects,
                provideMockActions(() => actions),
                { provide: Router, useValue: {} }, // dependency of RouterStoreSerModule
            ],
        });

        effects = TestBed.get(PageStartEffects);
    });

    it('should work', () =>
    {
        const routerAction: RouterNavigationAction<RouterStateSer> = {
            type: ROUTER_NAVIGATION,
            payload: {
                routerState: {
                    url: '/start',
                    root: {
                        configPath: 'start',
                        data: {
                            uid: startRouteId,
                        },
                        children: [],
                        params: [],
                    },
                },
                event: null,
            },
        };

        actions = hot('a', { a: routerAction });

        const expected = cold('(ab)', {
            a: new UserStatusAction({ status: UserStatus.NONE }),
            b: new UserInputAction({ username: '' }),
        });

        expect(effects.effect$).toBeObservable(expected);
    });
});
