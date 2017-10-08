import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State as ExamState, MODULE_STORE_TOKEN } from '../../logic/reducers';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import { CommonContainer } from '../../utils/common-container';
import { ExamStartAction } from '../../logic/actions/exam.actions';

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
    public startDisabled = false;

    public onStart(event: Event)
    {
        this.startDisabled = true;
        this.store$.dispatch(new ExamStartAction());
    }

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
                .subscribe({ next: examInfo => this.nextExamInfo(examInfo), error: (e) => { throw e; } }));
    }

    protected examInfoStoreSubs: Store<AsyncDataSer<ExamInfo>> = null;

    /**
     * Process a new [[ExamInfo]] data incorporating it onto the view.
     * @param examInfo
     */
    protected nextExamInfo(examInfo: AsyncDataSer<ExamInfo>)
    {
        this.examInfoA = examInfo ? examInfo : AsyncDataSer.loading<ExamInfo>();
        this.duration = AsyncDataSer.hasData(this.examInfoA, false) ? this.convertSec2Min(this.examInfoA.data.duration) : '';
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Produce a string representation of time using minutes and seconds from a absolute seconds number.
     * @param secs
     */
    protected convertSec2Min(secs: number): string
    {
        const min = Math.floor(secs / 60);
        const sec = secs - min * 60;
        return min + ' min' + (sec > 0 ? ' and ' + sec + ' sec' : '');
    }
}
