import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam1 } from '../utils/exam-samples';
import { ExamInfo } from '../models/exam-info';

@Injectable()
export class ExamFetchService
{
    public fetchExam(id: string): Observable<AsyncDataSer<ExamInfo>>
    {
        const { exam } = createExam1();
        return Observable.concat(
            Observable.of(new AsyncDataSer<ExamInfo>(null, true)),
            Observable.of(new AsyncDataSer<ExamInfo>(exam, false)).delay(500)
        );
    }
}
