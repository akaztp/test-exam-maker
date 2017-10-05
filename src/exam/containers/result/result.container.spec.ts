import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultContainer } from './result.container';

describe('Exam/Containers/' + ResultContainer.name, () =>
{
    let component: ResultContainer;
    let fixture: ComponentFixture<ResultContainer>;

    beforeEach(async(() =>
    {
        TestBed
            .configureTestingModule({
                declarations: [ResultContainer],
            })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(ResultContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () =>
    {
        expect(component).toBeTruthy();
    });
});
