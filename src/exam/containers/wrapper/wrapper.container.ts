import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { CommonContainer } from '../../utils/common-container';
import { ExamInfo } from '../../models/exam-info';
import { AsyncDataSer } from '../../../utils/asyncData';
import { State as ExamState, MODULE_STORE_TOKEN } from '../../logic/reducers';

@Component({
    selector: 'exm-wrapper',
    templateUrl: './wrapper.container.html',
    styleUrls: ['./wrapper.container.scss'],
})
export class WrapperContainer extends CommonContainer
{
    public examInfo$: Observable<AsyncDataSer<ExamInfo>> = null;

    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<ExamState>,
    )
    {
        super();

        this.examInfo$ = this.store$.select(state => state.exam.data);
    }

}
