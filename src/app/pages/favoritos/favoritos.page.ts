import { Component, OnInit } from '@angular/core';
import { FavoritosService } from '../../services/favoritos.service';
import { ToastController, AlertController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonList, IonInput, IonFab, IonFabButton, IonIcon, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { add, close } from 'ionicons/icons';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  standalone: true,
  imports: [IonButtons,
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem,
    IonLabel, IonButton, IonList, IonInput, IonFab, IonFabButton,
    IonIcon, CommonModule, FormsModule, IonMenuButton]
})
export class FavoritosPage implements OnInit {
  favoritos: any[] = [];
  favoritoEditando: any = null;
  mostrandoFormulario = false;
  novoFavorito = { moedaOrigem: '', moedaDestino: '', valor: 0, resultado: 0 };

  constructor(
    private favoritosService: FavoritosService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.carregarFavoritos();
  }

  carregarFavoritos() {
    this.favoritosService.listarFavoritos().subscribe({
      next: (dados) => (this.favoritos = dados),
      error: () => this.mostrarToast('Erro ao carregar favoritos', 'danger')
    });
  }

  abrirFormulario(favorito: any = null) {
    this.mostrandoFormulario = true;
    this.favoritoEditando = favorito;
    this.novoFavorito = favorito
      ? { ...favorito }
      : { moedaOrigem: '', moedaDestino: '', valor: 0, resultado: 0 };
  }

  cancelarFormulario() {
    this.mostrandoFormulario = false;
    this.favoritoEditando = null;
  }

  salvarFavorito() {
    if (!this.novoFavorito.moedaOrigem || !this.novoFavorito.moedaDestino || this.novoFavorito.valor <= 0) {
      this.mostrarToast('Preencha todos os campos!', 'warning');
      return;
    }

    if (this.favoritoEditando) {
      this.favoritosService.editarFavorito(this.favoritoEditando._id, this.novoFavorito).subscribe({
        next: () => {
          this.mostrarToast('Favorito atualizado!', 'success');
          this.cancelarFormulario();
          this.carregarFavoritos();
        },
        error: () => this.mostrarToast('Erro ao atualizar', 'danger')
      });
    } else {
      
      this.favoritosService.adicionarFavorito(this.novoFavorito).subscribe({
        next: () => {
          this.mostrarToast('Favorito adicionado!', 'success');
          this.cancelarFormulario();
          this.carregarFavoritos();
        },
        error: () => this.mostrarToast('Erro ao adicionar', 'danger')
      });
    }
  }

  async excluirFavorito(id: string) {
    const alert = await this.alertController.create({
      header: 'Excluir favorito',
      message: 'Tem certeza que deseja excluir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.favoritosService.deletarFavorito(id).subscribe({
              next: () => {
                this.mostrarToast('Excluído com sucesso!', 'success');
                this.carregarFavoritos();
              },
              error: () => this.mostrarToast('Erro ao excluir', 'danger')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  private async mostrarToast(msg: string, color: string) {
    const toast = await this.toastController.create({ message: msg, color, duration: 2000 });
    toast.present();
  }
}
