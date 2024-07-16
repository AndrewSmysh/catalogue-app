import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarforComponent } from './carfor.component';

describe('CarforComponent', () => {
  let component: CarforComponent;
  let fixture: ComponentFixture<CarforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarforComponent]
    });
    fixture = TestBed.createComponent(CarforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
