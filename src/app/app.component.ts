import { Component, Optional } from '@angular/core';
import { Store } from '@ngrx/store';

import { userStatus } from './logic/user/user.actions';
import { UserStatus } from './logic/user/user.reducer';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent
{
	constructor(@Optional() private store: Store<any>)
	{
		if (this.store)
			this.store.dispatch(userStatus(UserStatus.NONE));
	}
}
