import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Home } from './app/pages/dashboard/home.component';
import { Notfound } from './app/pages/notfound/notfound';
import { Busca } from './app/pages/busca/busca.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Home },
            { path: 'busca/:titulo', component: Busca },
            { path: 'busca/genero/:genero', component: Busca }
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
