import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private colecao = collection(db, 'favoritos');

  constructor() {}

  async getFavoritos(): Promise<any[]> {
    const snapshot = await getDocs(this.colecao);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async adicionarFavorito(item: any) {
    await addDoc(this.colecao, item);
  }

  async removerFavorito(id: string) {
    const ref = doc(db, 'favoritos', id);
    await deleteDoc(ref);
  }

  async editarFavorito(id: string, novosDados: any) {
    const ref = doc(db, 'favoritos', id);
    await updateDoc(ref, novosDados);
  }
}
