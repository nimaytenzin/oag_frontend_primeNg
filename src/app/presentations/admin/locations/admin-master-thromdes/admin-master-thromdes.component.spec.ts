import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMasterThromdesComponent } from './admin-master-thromdes.component';

describe('AdminMasterThromdesComponent', () => {
  let component: AdminMasterThromdesComponent;
  let fixture: ComponentFixture<AdminMasterThromdesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMasterThromdesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMasterThromdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
