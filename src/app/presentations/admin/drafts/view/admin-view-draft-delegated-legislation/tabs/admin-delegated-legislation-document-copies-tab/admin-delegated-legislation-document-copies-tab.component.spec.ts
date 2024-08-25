/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminDelegatedLegislationDocumentCopiesTabComponent } from './admin-delegated-legislation-document-copies-tab.component';

describe('AdminDelegatedLegislationDocumentCopiesTabComponent', () => {
  let component: AdminDelegatedLegislationDocumentCopiesTabComponent;
  let fixture: ComponentFixture<AdminDelegatedLegislationDocumentCopiesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDelegatedLegislationDocumentCopiesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDelegatedLegislationDocumentCopiesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
