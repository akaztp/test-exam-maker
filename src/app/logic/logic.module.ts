import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap, Action } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSer, RouterStoreSerModule } from 'router-store-ser';

import { reducer as userReducer, State as UserState } from './reducers/user.reducer';
import { PageStartEffects } from './effects/router-start.effects';
import { RouterStoreExtension } from '../../utils/router-state-extension';

export interface State
{
    user: UserState;
    routerReducer: RouterReducerState<RouterStateSer>;
}

const reducers: ActionReducerMap<State, Action> = {
    routerReducer,
    user: userReducer,
};

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 50, //  Retains last n states
        }),
        EffectsModule.forRoot([
            PageStartEffects,
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
