import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { matchObservable } from 'match-observable';

import { ExamEvalService } from './exam-eval.service';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam, solveQuestions } from '../utils/exam-samples';
import { deepEqual } from '../utils/deep-equal';
import { failOnObsError } from '../utils/jasmine-fail-observer';

describe('Exam/Data/' + ExamEvalService.name, () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [ExamEvalService],
        });
    });

    it('should be created', inject([ExamEvalService], (service: ExamEvalService) =>
    {
        expect(service).toBeTruthy();
    }));

    it('should eval questions correctly',  fakeAsync(() =>
    {
        inject([ExamEvalService], (service: ExamEvalService) =>
        {
            const { exam, questions, solutions } = createExam('1');

            testForScore(0);

            questions[0].answers.forEach(
                (answer, idx) =>
                {
                    answer.checked = solutions[0].indexOf(idx) >= 0;
                });
            testForScore(Math.round(100 * 1.0 / questions.length * exam.totalScore) / 100.0);

            solveQuestions(questions, solutions);
            testForScore(exam.totalScore);

            function testForScore(expectedScore: number)
            {
                const expectedValues = [
                    AsyncDataSer.loading<number>(),
                    new AsyncDataSer<number>(expectedScore),
                ];

                const evalScore$ = service.evalQuestions(exam, questions);

                let matchResult: string;
                matchObservable(evalScore$.catch(failOnObsError), expectedValues, true, false, deepEqual)
                    .then(() => matchResult = null, result => matchResult = result);

                tick(1000);
                expect(matchResult).toBeNull();
            }
        })();
    }));
});
