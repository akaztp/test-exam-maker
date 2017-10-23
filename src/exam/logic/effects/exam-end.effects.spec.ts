import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { StoreModule, Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { matchObservable } from 'match-observable';

import { RouterOutEffects } from './router-out.effects';
import { ExamEndEffects } from './exam-end.effects';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamEvalService } from '../../data/exam-eval.service';
import { reducersMap } from '../logic.module';
import { State, MODULE_STORE_TOKEN } from '../state/state';
import { ExamStatus } from '../state/exam.state';
import { ExamStatusAction, ExamEndAction, ExamScoreAction } from '../actions/exam.actions';
import { ExamInfo } from '../../models/exam-info';
import { Question } from '../../models/question';
import { createExam } from '../../utils/exam-samples';
import { deepEqual } from '../../utils/deep-equal';
import { failOnObsError } from '../../utils/jasmine-fail-observer';

describe('Exam/Logic/' + ExamEndEffects.name, () =>
{
    let store$: Store<State>;
    let actions: Observable<any>;
    let effects: RouterOutEffects;
    let examEvalServiceSpy: jasmine.SpyObj<ExamEvalService> = null;

    function init(initialState: State)
    {
        const serviceSpy = jasmine.createSpyObj<ExamEvalService>(
            'ExamEvalService',
            {
                evalQuestions: Observable.of(new AsyncDataSer<number>(0)),
            });

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<State, Action>(
                    reducersMap,
                    initialState ? { initialState } : {}),
            ],
            providers: [
                ExamEndEffects,
                provideMockActions(() => actions.do(a => store$.dispatch(a))),
                { provide: MODULE_STORE_TOKEN, useExisting: Store },
                { provide: ExamEvalService, useValue: serviceSpy },
            ],
        });

        effects = TestBed.get(ExamEndEffects);
        store$ = TestBed.get(Store);
        examEvalServiceSpy = TestBed.get(ExamEvalService);
    }

    it('should emit the correct actions.', () => fakeAsync(() =>
    {
        const { exam, questions } = createExam('1');

        init({
            exam: {
                data: new AsyncDataSer<ExamInfo>(exam, false),
                resultScore: new AsyncDataSer<number>(0),
                timeLeft: 0, // seconds
                status: ExamStatus.ENDED,
            },
            questions: {
                current: 0,
                data: new AsyncDataSer<Question[]>(questions, false),
            },
        });

        actions = Observable.of(new ExamEndAction({ status: ExamStatus.ENDED }));
        const score = new AsyncDataSer<number>(0);
        const expected =  [
            new ExamStatusAction({ status: ExamStatus.ENDED }),
            new ExamScoreAction({ score: AsyncDataSer.loading<number>() }),
            new ExamScoreAction({ score }),
        ];
        let matchResult: string;
        matchObservable<Action>(effects.effect$.catch(failOnObsError), expected, true, false, deepEqual)
            .then(() => matchResult = null, result => matchResult = result);
        flush();
        expect(matchResult).toBeNull();

        expect(examEvalServiceSpy.evalQuestions).toHaveBeenCalledWith(exam, questions);
    })());

});
