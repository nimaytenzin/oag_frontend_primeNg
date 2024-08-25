/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminDraftLegislationEditModalComponent } from './admin-draft-legislation-edit-modal.component';

describe('AdminDraftLegislationEditModalComponent', () => {
  let component: AdminDraftLegislationEditModalComponent;
  let fixture: ComponentFixture<AdminDraftLegislationEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDraftLegislationEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDraftLegislationEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
