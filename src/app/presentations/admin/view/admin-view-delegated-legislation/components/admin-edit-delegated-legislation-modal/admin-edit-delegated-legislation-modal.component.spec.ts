/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminEditDelegatedLegislationModalComponent } from './admin-edit-delegated-legislation-modal.component';

describe('AdminEditDelegatedLegislationModalComponent', () => {
  let component: AdminEditDelegatedLegislationModalComponent;
  let fixture: ComponentFixture<AdminEditDelegatedLegislationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditDelegatedLegislationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditDelegatedLegislationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
