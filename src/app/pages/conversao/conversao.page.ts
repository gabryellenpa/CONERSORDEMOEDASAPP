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
    const url = `https://api.exchangerate.host/convert?from=${this.fromCurrency}&to=${this.toCurrency}&amount=${this.amount}`;
    this.http.get<any>(url).subscribe(data => {
      this.result = data.result;
    });
  }
}