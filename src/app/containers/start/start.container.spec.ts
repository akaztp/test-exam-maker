import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartContainer } from './start.container';

describe(StartContainer.name, () =>
{
    let component: StartContainer;
    let fixture: ComponentFixture<StartContainer>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [StartContainer]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(StartContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () =>
    {
        expect(component).toBeTruthy();
    });
});
