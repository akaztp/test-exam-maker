import { TestBed, inject } from '@angular/core/testing';

import { ExamTimerService } from './exam-timer.service';

describe('ExamTimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamTimerService]
    });
  });

  it('should be created', inject([ExamTimerService], (service: ExamTimerService) => {
    expect(service).toBeTruthy();
  }));
});
