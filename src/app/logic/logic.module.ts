import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap, Action } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSer, RouterStoreSerModule } from 'router-store-ser';

import { RouterStoreExtension } from '../../utils/router-state-extension';

export interface State
{
    // next property name must be exactly as stated, because @ngrx/router-store expects it
    routerReducer: RouterReducerState<RouterStateSer>;
}

const reducers: ActionReducerMap<State, Action> = {
    routerReducer,
};

@NgModule({
    imports: [
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 50, //  Retains last n states
        }),
        EffectsModule.forRoot([
        ]),
        StoreRouterConnectingModule,
        RouterStoreSerModule,
    ],
    declarations: [],
    providers: [
        RouterStoreExtension,
    ],
})
export class LogicModule
{
    constructor(
        // just instantiate it, so it will be dispatching actions
        ext: RouterStoreExtension,
    ) {}
}
