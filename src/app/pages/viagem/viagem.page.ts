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
  IonInput
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.page.html',
  styleUrls: ['./viagem.page.scss'],
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
export class ViagemPage {
  fromCurrency = 'BRL';
  toCurrency = 'USD';
  valorDisponivel = 0;
  valorNecessario = 0;
  resultado: string | null = null;

  taxasFixas: any = {
    BRL: { USD: 0.20, EUR: 0.18 },
    USD: { BRL: 5.00, EUR: 0.90 },
    EUR: { BRL: 5.50, USD: 1.10 }
  };

  calcular() {
    const taxa = this.taxasFixas[this.fromCurrency]?.[this.toCurrency];
    if (!taxa) {
      this.resultado = 'Conversão não disponível para essas moedas.';
      return;
    }

    const disponivelConvertido = this.valorDisponivel * taxa;
    const diferenca = disponivelConvertido - this.valorNecessario;

    if (diferenca >= 0) {
      this.resultado = `Você tem o suficiente! Vai sobrar ${diferenca.toFixed(2)} ${this.toCurrency}.`;
    } else {
      this.resultado = `Você precisa levar mais ${(Math.abs(diferenca)).toFixed(2)} ${this.toCurrency}.`;
    }
  }
}