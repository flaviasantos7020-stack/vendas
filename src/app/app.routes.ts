import { Routes } from '@angular/router';

import { Shell } from './layout/shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'produtos',
        loadComponent: () =>
          import('./features/catalog/product-list/product-list').then((m) => m.ProductList),
      },
      {
        path: 'produtos/:slug',
        loadComponent: () =>
          import('./features/catalog/product-detail/product-detail').then(
            (m) => m.ProductDetail,
          ),
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
