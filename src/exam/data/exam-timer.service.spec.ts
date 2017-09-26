import { TestBed, inject, fakeAsync, flush, tick } from '@angular/core/testing';
import { expectObservableValues } from 'jasmine-rx-matcher';

import { ExamTimerService } from './exam-timer.service';
describe('Exam/Data/' + ExamTimerService.name, () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [ExamTimerService]
        });
    });

    it('should be created', inject([ExamTimerService], (service: ExamTimerService) =>
    {
        expect(service).toBeTruthy();
    }));

    it('should generate a timer', (done) =>
    {
        fakeAsync(() =>
        {
            inject([ExamTimerService], (service: ExamTimerService) =>
            {
                const expectedValues = [5, 4, 3, 2, 1, 0];

                const timer$ = service.getTimer(5);
                expectObservableValues(timer$, expectedValues, true)
                    .then(() =>
                    {
                        done();
                        flush();
                    },
                    (error) => fail(error));
                tick(10000);
                flush();

            })();
        })();
    });

});
