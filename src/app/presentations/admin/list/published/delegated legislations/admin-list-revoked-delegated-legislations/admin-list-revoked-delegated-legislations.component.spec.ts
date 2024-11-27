/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminListRevokedDelegatedLegislationsComponent } from './admin-list-revoked-delegated-legislations.component';

describe('AdminListRevokedDelegatedLegislationsComponent', () => {
  let component: AdminListRevokedDelegatedLegislationsComponent;
  let fixture: ComponentFixture<AdminListRevokedDelegatedLegislationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListRevokedDelegatedLegislationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListRevokedDelegatedLegislationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
