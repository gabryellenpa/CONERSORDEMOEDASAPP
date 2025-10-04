import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversaoPage } from './conversao.page';

describe('ConversaoPage', () => {
  let component: ConversaoPage;
  let fixture: ComponentFixture<ConversaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
