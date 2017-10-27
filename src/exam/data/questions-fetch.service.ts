import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam } from '../utils/exam-samples';
import { Question } from '../models/question';
import { ExamInfo } from '../models/exam-info';

@Injectable()
export class QuestionsFetchService
{
    public fetchQuestions(examInfo: ExamInfo): Observable<AsyncDataSer<Question[]>>
    {
        const { questions } = createExam('1');
        return Observable.concat(
            Observable.of(AsyncDataSer.loading<Question[]>()),
            // can't use a simple .delay(500) because it is not compatible with fakeAsync() in the testing.
            Observable.interval(500).take(1).map(_ => new AsyncDataSer<Question[]>(questions, false)),
        );
    }
}
