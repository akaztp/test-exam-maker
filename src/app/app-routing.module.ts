import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './pages/start/start.component';

const appRoutes: Routes = [
	{ path: 'start', component: StartComponent },
	{ path: '', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true } // <-- debugging purposes only
		)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
