import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
// import { By } from '@angular/platform-browser';

import { StartContainer } from './start.container';
import { State as ExamState, reducers, MODULE_STORE_TOKEN } from '../../logic/reducers';
import { ExamInfo } from '../../models/exam-info';
import { ExamStatus } from '../../logic/reducers/exam.reducer';
import { AsyncDataSer } from '../../../utils/asyncData';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Sec2TimePipe } from "../../pipes/sec2time.pipe";

describe('Exam/Containers/' + StartContainer.name, () =>
{
    let component: StartContainer;
    let fixture: ComponentFixture<StartContainer>;
    let store$: Store<ExamState>;

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
                    declarations: [
                        StartContainer,
                        Sec2TimePipe,
                    ],
                    providers: [
                        { provide: MODULE_STORE_TOKEN, useExisting: Store },
                    ],
                })
                .compileComponents();
        }

        function getContext()
        {
            fixture = TestBed.createComponent(StartContainer);
            component = fixture.componentInstance;
            fixture.detectChanges();

            store$ = TestBed.get(MODULE_STORE_TOKEN);

        }

    }

    it('should show loading the exam message', (done) =>
    {
        init(AsyncDataSer.loading<ExamInfo>()).then(
            () =>
            {
                expect(component).toBeTruthy();
                expect(fixture.debugElement.query(de => de.references['loadingExam'])).toBeTruthy();
                expect(fixture.debugElement.query(de => de.references['examLoaded'])).toBeNull();
                done();
            });
    });

    it('should show the exam info', (done) =>
    {
        const duration = 90;
        const durationOutput = '1m 30s';
        const examInfoA = new AsyncDataSer<ExamInfo>({
            duration, // seconds
            name: 'Test Exam',
            description: 'Test Description',
            passScore: 50,
            totalScore: 100,
        } as ExamInfo);

        init(examInfoA).then(
            () =>
            {
                expect(fixture.debugElement.query(de => de.references['loadingExam'])).toBeNull();
                expect(fixture.debugElement.query(de => de.references['examLoaded'])).toBeTruthy();

                expect(
                    (fixture.debugElement.query(de => de.references['examName']).nativeElement as HTMLElement).innerText,
                ).toBe(examInfoA.data.name);

                expect(
                    (fixture.debugElement.query(de => de.references['examDescription']).nativeElement as HTMLElement).innerText,
                ).toBe(examInfoA.data.description);

                expect(
                    (fixture.debugElement.query(de => de.references['examDuration']).nativeElement as HTMLElement).innerText,
                ).toBe(durationOutput);

                done();
            });
    });
});
