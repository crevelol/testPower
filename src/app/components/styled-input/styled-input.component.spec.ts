import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyledInputComponent } from './styled-input.component';

describe('StyledInputComponent', () => {
  let component: StyledInputComponent;
  let fixture: ComponentFixture<StyledInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyledInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyledInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
