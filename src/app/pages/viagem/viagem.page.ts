import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonSelect, IonSelectOption, IonLabel, IonButton, IonInput, ToastController, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.page.html',
  styleUrls: ['./viagem.page.scss'],
  standalone: true,
  imports: [IonButtons,
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
    IonInput, IonMenuButton]
})
export class ViagemPage {

  fromCurrency = 'BRL';
  toCurrency = 'USD';
  valorDisponivel = 0;
  valorNecessario = 0;
  resultado: string | null = null;

  constructor(private toastCtrl: ToastController) {}

  taxasFixas: any = {
    BRL: { USD: 0.20, EUR: 0.18 },
    USD: { BRL: 5.00, EUR: 0.90 },
    EUR: { BRL: 5.50, USD: 1.10 }
  };

 
  async calcular() {

    if (!this.fromCurrency || !this.toCurrency || !this.valorDisponivel || !this.valorNecessario) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos antes de calcular ⚠️',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

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
