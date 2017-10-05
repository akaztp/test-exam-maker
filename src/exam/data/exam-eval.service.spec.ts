import { TestBed, inject } from '@angular/core/testing';

import { ExamEvalService } from './exam-eval.service';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam1, solveQuestions } from '../utils/exam-samples';

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

    it('should eval questions correctly', (done) =>
    {
        inject([ExamEvalService], (service: ExamEvalService) =>
        {
            const { exam, questions, solutions } = createExam1();
            let expectedScore = 0;

            service.evalQuestions(exam, questions, solutions)
                .then(checkResponse)
                .then(() =>
                {
                    questions[0].answers.forEach((answer, idx) =>
                    {
                        answer.checked = solutions[0].indexOf(idx) >= 0;
                    });
                    expectedScore = 1.0 / questions.length * exam.totalScore;
                    return service.evalQuestions(exam, questions, solutions);
                })
                .then(checkResponse)
                .then(() =>
                {
                    solveQuestions(questions, solutions);
                    expectedScore = exam.totalScore;
                    return service.evalQuestions(exam, questions, solutions);
                })
                .then(checkResponse)
                .then(done, errorFail);

            function checkResponse(score: AsyncDataSer<number>)
            {
                expect(AsyncDataSer.hasData(score, false)).toBeTruthy();
                expect(score.data).toBe(expectedScore);
            }

            function errorFail(error: Error)
            {
                fail('calling service ExamEvalService returned a failed promise: ' + error.message);
                throw error;
            }
        })();
    });
});
