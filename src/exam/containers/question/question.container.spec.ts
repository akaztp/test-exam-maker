import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Action, Store } from '@ngrx/store';

import { reducers, State, MODULE_STORE_TOKEN } from '../../logic/reducers';
import { QuestionContainer } from './question.container';

describe('Exam/Containers/' + QuestionContainer.name, () =>
{
    let component: QuestionContainer;
    let fixture: ComponentFixture<QuestionContainer>;

    beforeEach(async(() =>
    {
        TestBed
            .configureTestingModule({
                imports: [
                    StoreModule.forRoot<State, Action>(reducers, {}),
                ],
                declarations: [QuestionContainer],
                providers: [
                    { provide: MODULE_STORE_TOKEN, useExisting: Store },
                    { provide: ChangeDetectorRef, useValue: null },
                ],
            })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(QuestionContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () =>
    {
        expect(component).toBeTruthy();
    });
});
