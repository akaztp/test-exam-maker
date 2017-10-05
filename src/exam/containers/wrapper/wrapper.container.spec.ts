import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperContainer } from './wrapper.container';

describe('Exam/Containers/' + WrapperContainer.name, () => {
  let component: WrapperContainer;
  let fixture: ComponentFixture<WrapperContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrapperContainer ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
