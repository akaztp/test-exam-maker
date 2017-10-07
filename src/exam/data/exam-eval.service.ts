import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { ExamInfo } from '../models/exam-info';
import { AsyncDataSer } from '../../utils/asyncData';

/**
 * This service takes an exam and its answers and evaluates its correctness using the server.
 * The server for now is non-existing having the caller to provide the solutions to use in the evaluation.
 */
@Injectable()
export class ExamEvalService
{
    public evalQuestions(exam: ExamInfo, questions: Question[], solutions?: number[][]): Promise<AsyncDataSer<number>>
    {
        if (!solutions)
            return Promise.reject(new Error('ExamEvalService. NOT IMPLEMENTED!'));

        if (questions.length !== solutions.length)
            return Promise.reject(new Error('ExamEvalService. Solutions provided do not match questions.'));

        const correctQuestions = questions.filter(evalAnswer);
        return Promise.resolve(new AsyncDataSer<number>(correctQuestions.length / questions.length * exam.totalScore));

        function evalAnswer(question: Question, idx: number): boolean
        {
            return question.answers.every(
                (answer, i) => answer.checked === (solutions[idx].indexOf(i) >= 0));
        }
    }
}
