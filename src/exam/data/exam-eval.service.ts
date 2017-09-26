import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/take';
// import 'rxjs/add/operator/startWith';
import { Question } from '../models/question';
import { ExamInfo } from '../models/exam-info';
import { AsyncDataSer } from '../../utils/asyncData';

@Injectable()
export class ExamEvalService
{
    public evalQuestions(exam: ExamInfo, questions: Array<Question>, solutions?: Array<Array<number>>): Promise<AsyncDataSer<number>>
    {
        if (!solutions)
            return Promise.reject(new Error('ExamEvalService. NOT IMPLEMENTED!'));

        if (questions.length !== solutions.length)
            return Promise.reject(new Error('ExamEvalService. Solutions provided do not match questions.'));

        const correctQuestions = questions.filter(evalAnswer);
        return Promise.resolve(new AsyncDataSer<number>(correctQuestions.length / questions.length * exam.totalScore));

        function evalAnswer(question: Question, idx: number): boolean {
            return question.answers.every(
                (answer, i) => answer.checked === (solutions[idx].indexOf(i) >= 0));
        }
    }

    constructor(
    ) { }
}
