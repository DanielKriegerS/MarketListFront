import { Routes } from '@angular/router';

export const routes: Routes = [
      {
        path: '',
        loadComponent: () =>
          import('./components/market-list-create/market-list-create.component').then(
            (m) => m.MarketListCreateComponent
          ),
        },                
        {
          path: 'all-lists',
          loadComponent: () =>
            import('./components/market-list-all/market-list-all.component').then(
              (m) => m.MarketListAllComponent
            ),
        },
        {
          path: 'market-list/:id',
          loadComponent: () =>
            import('./components/market-list/market-list.component').then(
              (m) => m.MarketListComponent
            ),
        },
        {
          path: 'finished-market-list-all',
          loadComponent: () =>
            import('./components/market-list-all/market-list-all.component').then(
              (m) => m.MarketListAllComponent
            ),
        },
        {
          path: 'finished-market-list/:id',
          loadComponent: () =>
            import('./components/finished-market-list/finished-market-list.component').then(
              (m) => m.FinishedMarketListComponent
            ),
        },
        {
          path: '**',
          redirectTo: '', 
          pathMatch: 'full',
        },
];
