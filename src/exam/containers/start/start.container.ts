import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State as ExamState, MODULE_STORE_TOKEN } from '../../logic/reducers';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import { CommonContainer } from '../../utils/common-container';

@Component({
    selector: 'exm-start',
    templateUrl: './start.container.html',
    styleUrls: ['./start.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartContainer extends CommonContainer
{
    public examInfoA: AsyncDataSer<ExamInfo> = null;
    public duration: string;

    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<ExamState>,
        protected changeDetectorRef: ChangeDetectorRef,
    )
    {
        super();
        this.disposableSubs.push(
            this.store$
                .select(state => state.exam.data)
                .subscribe({ next: this.nextExamInfo, error: (e) => { throw e; } }));
    }

    protected examInfoStoreSubs: Store<AsyncDataSer<ExamInfo>> = null;

    protected nextExamInfo = (examInfo: AsyncDataSer<ExamInfo>) =>
    {
        this.examInfoA = examInfo ? examInfo : new AsyncDataSer<ExamInfo>(null, true);
        this.duration = AsyncDataSer.hasData(this.examInfoA, false) ? this.convertSec2Min(this.examInfoA.data.duration) : '';
        this.changeDetectorRef.markForCheck();
    }

    protected convertSec2Min(secs: number): string
    {
        const min = Math.floor(secs / 60);
        const sec = secs - min * 60;
        return min + ' min' + (sec > 0 ? ' and ' + sec + ' sec' : '');
    }
}
