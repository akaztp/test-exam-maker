import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './pages/start/start.component';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/start', pathMatch: 'full' },
	{ path: 'start', component: StartComponent },  // there are references to this route using the component
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
