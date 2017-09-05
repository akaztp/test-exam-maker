import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule, ActionReducerMap, Action } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogicModule } from './logic/logic.module';
import { ExamModule } from './exam/exam.module';
import { StartComponent } from './pages/start/start.component';

@NgModule({
	declarations: [
		AppComponent,
		StartComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		LogicModule,
		ExamModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
