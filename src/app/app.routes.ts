import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'moedas',
    pathMatch: 'full'
  },
  {
    path: 'moedas',
    loadComponent: () => import('./pages/moedas/moedas.page').then(m => m.MoedasPage)
  },
  {
    path: 'conversao',
    loadComponent: () => import('./pages/conversao/conversao.page').then(m => m.ConversaoPage)
  }
];