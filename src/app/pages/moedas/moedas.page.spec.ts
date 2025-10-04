import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoedasPage } from './moedas.page';

describe('MoedasPage', () => {
  let component: MoedasPage;
  let fixture: ComponentFixture<MoedasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MoedasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
