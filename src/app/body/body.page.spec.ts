import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyPage } from './body.page';

describe('BodyPage', () => {
  let component: BodyPage;
  let fixture: ComponentFixture<BodyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
