import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { IScheduler } from "rxjs/Scheduler";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class ExamTimerService
{

	public getTimer(duration: number): Observable<number>
	{
		return Observable.interval(1000, this.scheduler).map(i => duration-i).take(duration);
	}

	constructor(
		@Inject('TestScheduler') @Optional()
		protected scheduler: IScheduler,
	) { }

}
