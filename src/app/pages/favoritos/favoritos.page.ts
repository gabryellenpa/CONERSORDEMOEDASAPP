import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonIcon, IonButtons } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; 
import { addIcons } from 'ionicons';
import { trashOutline, createOutline, addCircleOutline } from 'ionicons/icons';
import { collection, getDocs } from 'firebase/firestore';
import { FavoritosService } from '../../services/favoritos.service';
import { db } from '../../firebase.config';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [IonButtons, 
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonIcon
  ]
})

export class FavoritosPage {
  favoritos: any[] = [];

  constructor(
    private alertController: AlertController,
    private favoritosService: FavoritosService
  ) {
    addIcons({ trashOutline, createOutline, addCircleOutline });
    this.carregarFavoritos();
  }

   async testarFirebase() {
    try {
      const snapshot = await getDocs(collection(db, 'teste'));
      console.log('🔥 Firebase conectado! Total de documentos:', snapshot.size);
    } catch (error) {
      console.error('❌ Erro ao conectar ao Firebase:', error);
    }
  }

  ngOnInit() {
    this.testarFirebase(); // executa ao abrir a página
  }


  async carregarFavoritos() {
    this.favoritos = await this.favoritosService.getFavoritos();
  }

  async adicionarFavorito() {
    const alert = await this.alertController.create({
      header: 'Adicionar Favorito',
      inputs: [
        { name: 'moedaOrigem', type: 'text', placeholder: 'Moeda de Origem' },
        { name: 'moedaDestino', type: 'text', placeholder: 'Moeda de Destino' },
        { name: 'nomePersonalizado', type: 'text', placeholder: 'Nome Personalizado (opcional)' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: async (data) => {
            if (!data.moedaOrigem || !data.moedaDestino) return false;

            const novoFav = {
              moedaOrigem: data.moedaOrigem,
              moedaDestino: data.moedaDestino,
              nomePersonalizado: data.nomePersonalizado || ''
            };

            await this.favoritosService.adicionarFavorito(novoFav);
            await this.carregarFavoritos();
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async editarFavorito(fav: any) {
    const alert = await this.alertController.create({
      header: 'Editar Favorito',
      inputs: [
        { name: 'moedaOrigem', type: 'text', value: fav.moedaOrigem },
        { name: 'moedaDestino', type: 'text', value: fav.moedaDestino },
        { name: 'nomePersonalizado', type: 'text', value: fav.nomePersonalizado }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: async (data) => {
            await this.favoritosService.editarFavorito(fav.id, data);
            await this.carregarFavoritos();
          }
        }
      ]
    });
    await alert.present();
  }

  async removerFavorito(fav: any) {
    await this.favoritosService.removerFavorito(fav.id);
    await this.carregarFavoritos();
  }
}