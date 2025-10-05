import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conversao',
  templateUrl: './conversao.page.html',
  styleUrls: ['./conversao.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonButton,
    IonInput
  ]
})
export class ConversaoPage {
  fromCurrency = 'USD';
  toCurrency = 'BRL';
  amount = 1;
  result: number | null = null;

  constructor(private http: HttpClient) {}

  convert() {
  const url = 'https://v6.exchangerate-api.com/v6/51194c22216c81581980f90e/latest/' + this.fromCurrency;

  this.http.get<any>(url).subscribe(data => {
    const rate = data.conversion_rates[this.toCurrency];
    if (rate) {
      this.result = this.amount * rate;
    } else {
      alert('Moeda de destino não encontrada.');
    }
  }, error => {
    console.error('Erro na API:', error);
    alert('Erro ao buscar taxa de câmbio.');
  });
}
}