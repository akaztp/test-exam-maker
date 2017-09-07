import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap, Action } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { reducer as userReducer, State as UserState } from './reducers/user.reducer';
import { PageStartEffects } from "./effects/init.effects";

export interface State
{
	user: UserState,
	router: RouterReducerState,
}

const reducers: ActionReducerMap<State, Action> = {
	user: userReducer,
	router: routerReducer,
};

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([PageStartEffects]),
		StoreDevtoolsModule.instrument({
			maxAge: 50 //  Retains last n states
		}),
		StoreRouterConnectingModule
	],
	declarations: []
})
export class LogicModule { }
