import { OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { AsyncDataSer } from '../../utils/asyncData';
import { ExamInfo } from '../models/exam-info';
import { State, MODULE_STORE_TOKEN } from '../logic/state/state';

export class CommonContainer implements OnDestroy
{
    public examInfoA: AsyncDataSer<ExamInfo> = null;

    public ngOnDestroy()
    {
        this.componentDestroyed$.complete();
    }

    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<State>,
        protected changeDetectorRef: ChangeDetectorRef,
    )
    {
        this.store$
            .select(state => state.exam.data)
            .takeUntil(this.componentDestroyed$)
            .subscribe({ next: examInfo => this.nextExamInfo(examInfo), error: (e) => { throw e; } });
    }

    protected componentDestroyed$: Subject<void> = new Subject<void>();

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
