import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'add-food',
    loadComponent: () => import('./add-food/add-food.page').then((m) => m.AddFoodPage),
  },
  {
    path: 'statistics',
    loadComponent: () => import('./statistics/statistics.page').then((m) => m.StatisticsPage),
  },
];
