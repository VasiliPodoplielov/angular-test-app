import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterCardWrapperComponent } from './center-card-wrapper.component';

describe('CenterCardWrapperComponent', () => {
  let component: CenterCardWrapperComponent;
  let fixture: ComponentFixture<CenterCardWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CenterCardWrapperComponent]
    });
    fixture = TestBed.createComponent(CenterCardWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
