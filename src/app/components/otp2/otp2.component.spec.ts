import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpComponent2 } from './otp2.component';

describe('OtpComponent2', () => {
  let component: OtpComponent2;
  let fixture: ComponentFixture<OtpComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
