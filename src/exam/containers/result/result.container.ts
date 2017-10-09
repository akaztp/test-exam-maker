import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';

import { CommonContainer } from '../../utils/common-container';
import { State as ExamState, MODULE_STORE_TOKEN } from '../../logic/reducers';
import { AsyncDataSer } from '../../../utils/asyncData';

@Component({
    selector: 'exm-result',
    templateUrl: './result.container.html',
    styleUrls: ['./result.container.scss'],
})
export class ResultContainer  extends CommonContainer
{
    public resultScore: AsyncDataSer<number> = null;

    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<ExamState>,
        protected changeDetectorRef: ChangeDetectorRef,
    )
    {
        super(store$, changeDetectorRef);

        this.disposableSubs.push(
            this.store$
                .select(state => state.exam)
                .subscribe({
                    next:
                        (exam) =>
                        {
                            this.resultScore = exam.resultScore;
                            this.changeDetectorRef.markForCheck();
                        },
                    error: (e) => { throw e; } }));

    }

}
