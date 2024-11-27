/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminDelegatedLegislationAddParentModalComponent } from './admin-delegated-legislation-add-parent-modal.component';

describe('AdminDelegatedLegislationAddParentModalComponent', () => {
  let component: AdminDelegatedLegislationAddParentModalComponent;
  let fixture: ComponentFixture<AdminDelegatedLegislationAddParentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDelegatedLegislationAddParentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDelegatedLegislationAddParentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
