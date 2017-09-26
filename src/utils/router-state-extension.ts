import { Injectable } from '@angular/core';
import { Router, NavigationEnd, RoutesRecognized, RouterStateSnapshot } from '@angular/router';
import { RouterNavigationAction, RouterStateSerializer, RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';

export const ROUTER_ACTIVE = 'ROUTER_ACTIVE';

@Injectable()
export class RouterStoreExtension
{
    constructor(
        router: Router,
        stateSerializer: RouterStateSerializer<RouterStateSnapshot>,
        store: Store<{ routerReducer: RouterReducerState }>,
    )
    {
        router.events.subscribe(e =>
        {
            if (e instanceof RoutesRecognized)
                this.lastRoutesRecognized = e;
        });

        router.events
            .filter<NavigationEnd>((event) => event instanceof NavigationEnd)
            .withLatestFrom(store.select<RouterReducerState>(state => state.routerReducer))
            .subscribe(([event, routerReducer]) =>
            {
                // when timetraveling the event.id is an old one, but the navigation triggered uses a new id
                // this prevents the dispatch of ROUTER_ACTIVE when the state was changed by dev tools
                if (routerReducer.navigationId === event.id)
                {
                    const routerStateSer = stateSerializer.serialize(router.routerState.snapshot);
                    store.dispatch({
                        type: ROUTER_ACTIVE as any,
                        payload: {
                            routerState: routerStateSer,
                            event: new RoutesRecognized(
                                this.lastRoutesRecognized.id,
                                this.lastRoutesRecognized.url,
                                this.lastRoutesRecognized.urlAfterRedirects,
                                routerStateSer as any
                            ),
                        }
                    } as RouterNavigationAction<RouterStateSnapshot>);
                }
            });
    }

    protected lastRoutesRecognized: RoutesRecognized = null;
}
