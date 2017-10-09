import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Action, Store } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WrapperContainer } from './wrapper.container';
import { State as ExamState, reducers, MODULE_STORE_TOKEN } from '../../logic/reducers';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import { ExamStatus } from '../../logic/reducers/exam.reducer';

describe('Exam/Containers/' + WrapperContainer.name, () =>
{
    let component: WrapperContainer;
    let fixture: ComponentFixture<WrapperContainer>;
    let store$: Store<ExamState>;

    it('should show loading the exam message', (done) =>
    {
        const examInfoA = new AsyncDataSer<ExamInfo>({
            duration: 90, // seconds
            name: 'Test Exam',
            description: 'Test Description',
            passScore: 50,
            totalScore: 100,
        } as ExamInfo);

        init(examInfoA).then(
            () =>
            {
                expect(component).toBeTruthy();
                expect(fixture.debugElement.query(de => de.references['examName']).nativeElement.innerText).toBe(examInfoA.data.name);
                done();
            });
    });

    function init(exam: AsyncDataSer<ExamInfo>)
    {
        return initTestBed()
            .then(getContext);

        function initTestBed()
        {
            return TestBed
                .configureTestingModule({
                    imports: [
                        NgbModule.forRoot(),
                        StoreModule.forRoot<ExamState, Action>(reducers, {
                            initialState: {
                                exam: {
                                    data: exam,
                                    resultScore: new AsyncDataSer<number>(0),
                                    timeLeft: 0, // seconds
                                    status: ExamStatus.OFF,
                                },
                                questions: null,
                            },
                        }),
                    ],
                    declarations: [WrapperContainer],
                    providers: [
                        { provide: MODULE_STORE_TOKEN, useExisting: Store },
                    ],
                    schemas: [NO_ERRORS_SCHEMA],
                })
                .compileComponents();
        }

        function getContext()
        {
            fixture = TestBed.createComponent(WrapperContainer);
            component = fixture.componentInstance;
            fixture.detectChanges();

            store$ = TestBed.get(MODULE_STORE_TOKEN);
        }
    }

});
