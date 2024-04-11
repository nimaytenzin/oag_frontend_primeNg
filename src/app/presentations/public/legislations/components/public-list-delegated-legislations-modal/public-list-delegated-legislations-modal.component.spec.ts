import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicListDelegatedLegislationsModalComponent } from './public-list-delegated-legislations-modal.component';

describe('PublicListDelegatedLegislationsModalComponent', () => {
  let component: PublicListDelegatedLegislationsModalComponent;
  let fixture: ComponentFixture<PublicListDelegatedLegislationsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicListDelegatedLegislationsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicListDelegatedLegislationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
