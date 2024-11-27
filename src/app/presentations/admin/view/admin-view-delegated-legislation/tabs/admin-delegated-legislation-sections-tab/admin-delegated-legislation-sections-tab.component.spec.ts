/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminDelegatedLegislationSectionsTabComponent } from './admin-delegated-legislation-sections-tab.component';

describe('AdminDelegatedLegislationSectionsTabComponent', () => {
  let component: AdminDelegatedLegislationSectionsTabComponent;
  let fixture: ComponentFixture<AdminDelegatedLegislationSectionsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDelegatedLegislationSectionsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDelegatedLegislationSectionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
