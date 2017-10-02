import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State as ExamState } from '../../logic/reducers';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import { CommonContainer } from '../../utils/common-container';

@Component({
  selector: 'exm-start',
  templateUrl: './start.container.html',
  styleUrls: ['./start.container.scss']
})
export class StartContainer extends CommonContainer{

    public examInfoA: AsyncDataSer<ExamInfo> = null;

    constructor(
        protected store: Store<ExamState>
    ) {
        super();
        this.disposableSubs.push(this.store.select((state) => state.exam.data).subscribe(this.nextExamInfo));
    }

    protected examInfoStoreSubs: Store<AsyncDataSer<ExamInfo>> = null;

    protected nextExamInfo = (examInfo: AsyncDataSer<ExamInfo>) =>
    {
        this.examInfoA = examInfo;
    }
}
