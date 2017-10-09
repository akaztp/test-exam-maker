import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { matchObservable } from 'match-observable';

import { QuestionsFetchService } from './questions-fetch.service';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam } from '../utils/exam-samples';
import { failOnObsError } from '../utils/jasmine-fail-observer';
import { deepEqual } from '../utils/deep-equal';
import { Question } from '../models/question';

describe('Exam/Data/' + QuestionsFetchService.name, () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [QuestionsFetchService],
        });
    });

    it('should be created', inject([QuestionsFetchService], (service: QuestionsFetchService) =>
    {
        expect(service).toBeTruthy();
    }));

    it('should generate a timer', fakeAsync(() =>
    {
        inject([QuestionsFetchService], (service: QuestionsFetchService) =>
        {
            const { exam, questions } = createExam('1');
            const expectedValues = [
                AsyncDataSer.loading<Question[]>(),
                new AsyncDataSer<Question[]>(questions, false),
            ];
            const questions$ = service.fetchQuestions(exam);
            let matchResult: string;
            matchObservable(questions$.catch(failOnObsError), expectedValues, true, false, deepEqual)
                .then(() => matchResult = null, result => matchResult = result);

            tick(1000);
            expect(matchResult).toBeNull();
        })();
    }));
});
