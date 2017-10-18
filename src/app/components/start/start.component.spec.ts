import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';
import { AppRoutingModule } from '../../app-routing.module';

describe('App/Containers' + StartComponent.name, () =>
{
    let component: StartComponent;
    let fixture: ComponentFixture<StartComponent>;

    beforeEach(async(() =>
    {
        TestBed
            .configureTestingModule({
                imports: [
                    AppRoutingModule,
                ],
                declarations: [
                    StartComponent,
                ],
                providers: [
                    { provide: APP_BASE_HREF, useValue: '/' },
                ],
                schemas: [
                    NO_ERRORS_SCHEMA,
                ],
            })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(StartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () =>
    {
        expect(component).toBeTruthy();
    });
});
