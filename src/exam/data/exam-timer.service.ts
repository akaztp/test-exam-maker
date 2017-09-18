import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IScheduler } from 'rxjs/Scheduler';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/startWith';

@Injectable()
export class ExamTimerService
{
    /**
     * Returns a timer for clocking an exam. The timer is an observable of a countdown of seconds, that completes at the end.
     * @param duration The number of seconds for the countdown.
     */
    public getTimer(duration: number): Observable<number>
    {
        return Observable.interval(1000, this.scheduler).map(i => duration - i - 1).take(duration).startWith(duration);
    }

    /**
     *
     * @param scheduler An optional scheduler for to use when timming observables.
     * The scheduler is normally provided by the testing framework like in marble tests.
     */
    constructor(
        @Inject('TestScheduler') @Optional()
        protected scheduler: IScheduler,
    ) { }

}
