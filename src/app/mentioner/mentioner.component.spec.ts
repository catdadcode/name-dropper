import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionerComponent } from './mentioner.component';

describe('MentionerComponent', () => {
  let component: MentionerComponent;
  let fixture: ComponentFixture<MentionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentionerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MentionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
