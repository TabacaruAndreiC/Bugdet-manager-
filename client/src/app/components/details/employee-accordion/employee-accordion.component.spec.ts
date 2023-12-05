import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAccordionComponent } from './employee-accordion.component';

describe('EmployeeAccordionComponent', () => {
  let component: EmployeeAccordionComponent;
  let fixture: ComponentFixture<EmployeeAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
