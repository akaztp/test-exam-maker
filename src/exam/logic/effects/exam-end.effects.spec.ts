﻿import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { StoreModule, Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { matchObservable } from '../../utils/match-obs';

import { RouterOutEffects } from './router-out.effects';
import { ExamStatus } from '../reducers/exam.reducer';
import { ExamStatusAction, ExamEndAction, ExamScoreAction } from '../actions/exam.actions';
import { ExamEndEffects } from './exam-end.effects';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamEvalService } from '../../data/exam-eval.service';
import { reducers, State, MODULE_STORE_TOKEN } from '../reducers';
import { ExamInfo } from '../../models/exam-info';
import { Question } from '../../models/question';
import { createExam1 } from '../../utils/exam-samples';
import { deepEqual } from '../../utils/deep-equal';

describe('Exam/Logic/' + ExamEndEffects.name, () =>
{
    let store: Store<State>;
    let actions: Observable<any>;
    let effects: RouterOutEffects;
    let examEvalServiceSpy: jasmine.SpyObj<ExamEvalService> = null;

    function init(initialState: State)
    {
        const serviceSpy = jasmine.createSpyObj<ExamEvalService>('ExamEvalService',
            {
                evalQuestions: Promise.resolve(new AsyncDataSer(0)),
            });

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<State, Action>(reducers,
                    initialState ? { initialState: initialState } : {}),
            ],
            providers: [
                ExamEndEffects,
                provideMockActions(() => actions.do(a => store.dispatch(a))),
                { provide: MODULE_STORE_TOKEN, useExisting: Store },
                { provide: ExamEvalService, useValue: serviceSpy }
            ]
        });

        effects = TestBed.get(ExamEndEffects);
        store = TestBed.get(Store);
        examEvalServiceSpy = TestBed.get(ExamEvalService);
    }

    it('should emit the correct actions.', (done) =>
    {
        fakeAsync(() =>
        {
            const { exam, questions } = createExam1();

            init({
                exam: {
                    data: new AsyncDataSer<ExamInfo>(exam, false),
                    resultScore: new AsyncDataSer<number>(0),
                    timeLeft: 0, // seconds
                    status: ExamStatus.ENDED,
                },
                questions: {
                    current: 0,
                    data: new AsyncDataSer<Array<Question>>(questions, false),
                },
            });

            actions = Observable.of(new ExamEndAction({ status: ExamStatus.ENDED }));
            const score = new AsyncDataSer<number>(0);
            const expected =  [
                    new ExamStatusAction({ status: ExamStatus.ENDED }),
                    new ExamScoreAction({ score: new AsyncDataSer<number>(null, true) }),
                    new ExamScoreAction({ score: score }),
            ];

            matchObservable<Action>(effects.effect$, expected, true, -1, deepEqual)
                .catch(fail)
                .then(() => { expect(examEvalServiceSpy.evalQuestions).toHaveBeenCalledWith(exam, questions); flush();  })
                .then(() => { done(); flush(); });

            tick(1); // matchObservable uses a delay of 0 miliseconds
            flush();
        })();
    });

});
