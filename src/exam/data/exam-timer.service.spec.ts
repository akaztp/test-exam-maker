import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { matchObservable } from 'match-observable';

import { ExamTimerService } from './exam-timer.service';
import { failOnObsError } from '../utils/jasmine-fail-observer';

describe('Exam/Data/' + ExamTimerService.name, () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [ExamTimerService],
        });
    });

    it('should be created', inject([ExamTimerService], (service: ExamTimerService) =>
    {
        expect(service).toBeTruthy();
    }));

    it('should generate a timer', fakeAsync(() =>
    {
        inject([ExamTimerService], (service: ExamTimerService) =>
        {
            const expectedValues = [5, 4, 3, 2, 1, 0];
            const timer$ = service.getTimer(5);
            let matchResult: string;
            matchObservable(timer$.catch(failOnObsError), expectedValues, true)
                .then(() => matchResult = null, result => matchResult = result);

            tick(10000);
            expect(matchResult).toBeNull();
        })();
    }));
});
