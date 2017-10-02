import { NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdToolbarModule } from '@angular/material';

import { StartContainer } from './start.container';
import { AppRoutingModule } from '../../app-routing.module';

describe('App/Containers' + StartContainer.name, () =>
{
    let component: StartContainer;
    let fixture: ComponentFixture<StartContainer>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppRoutingModule,
                MdToolbarModule,
            ],
          declarations: [ StartContainer ],
          providers: [
              { provide: APP_BASE_HREF, useValue: '/' }
          ],
          schemas: [ NO_ERRORS_SCHEMA ],
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
