import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = 'https://backend-eubs.onrender.com/favoritos'; 

  constructor(private http: HttpClient) {}

  listarFavoritos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionarFavorito(favorito: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, favorito);
  }

  editarFavorito(id: string, favorito: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, favorito);
  }

  deletarFavorito(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
