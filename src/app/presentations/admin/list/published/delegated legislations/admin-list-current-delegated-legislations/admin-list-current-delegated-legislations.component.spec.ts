/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminListCurrentDelegatedLegislationsComponent } from './admin-list-current-delegated-legislations.component';

describe('AdminListCurrentDelegatedLegislationsComponent', () => {
  let component: AdminListCurrentDelegatedLegislationsComponent;
  let fixture: ComponentFixture<AdminListCurrentDelegatedLegislationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListCurrentDelegatedLegislationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListCurrentDelegatedLegislationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
