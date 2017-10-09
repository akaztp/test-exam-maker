import { OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AsyncDataSer } from '../../utils/asyncData';
import { ExamInfo } from '../models/exam-info';
import { State as ExamState, MODULE_STORE_TOKEN } from '../logic/reducers';

export class CommonContainer implements OnDestroy
{
    public examInfoA: AsyncDataSer<ExamInfo> = null;

    public ngOnDestroy()
    {
        this.disposableSubs.forEach(s => s.unsubscribe());
    }

    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<ExamState>,
        protected changeDetectorRef: ChangeDetectorRef,
    )
    {
        this.disposableSubs.push(
            this.store$
                .select(state => state.exam.data)
                .subscribe({ next: examInfo => this.nextExamInfo(examInfo), error: (e) => { throw e; } }));
    }

    protected disposableSubs: Subscription[] = [];

    /**
     * Process a new [[ExamInfo]] data incorporating it onto the view.
     * @param examInfo
     */
    protected nextExamInfo(examInfo: AsyncDataSer<ExamInfo>)
    {
        this.examInfoA = examInfo ? examInfo : AsyncDataSer.loading<ExamInfo>();
        this.changeDetectorRef.markForCheck();
    }
}
