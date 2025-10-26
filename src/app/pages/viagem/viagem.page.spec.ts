import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViagemPage } from './viagem.page';

describe('ViagemPage', () => {
  let component: ViagemPage;
  let fixture: ComponentFixture<ViagemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
