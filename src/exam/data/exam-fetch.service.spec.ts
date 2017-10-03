import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { matchObservable } from 'match-observable';

import { ExamFetchService } from './exam-fetch.service';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam1 } from '../utils/exam-samples';
import { ExamInfo } from '../models/exam-info';
import { failOnObsError } from '../utils/jasmine-fail-observer';

describe('Exam/Data/' + ExamFetchService.name, () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [ExamFetchService]
        });
    });

    it('should be created', inject([ExamFetchService], (service: ExamFetchService) =>
    {
        expect(service).toBeTruthy();
    }));

    it('should generate a timer', fakeAsync(() =>
    {
        inject([ExamFetchService], async (service: ExamFetchService) =>
        {
            const { exam } = createExam1();
            const expectedValues = [
                new AsyncDataSer<ExamInfo>(null, true),
                new AsyncDataSer<ExamInfo>(exam, false)
            ];
            const examInfo$ = service.fetchExam('');
            let matchResult: string;
            matchObservable(examInfo$.catch(failOnObsError), expectedValues, true)
                .then(() => matchResult = null, (result) => matchResult = result);

            tick(1000);
            expect(matchResult).toBeNull();
        })();
    }));
});