import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  { path: '',  redirectTo: '/medicines', pathMatch: 'full' },
  { path: '**',  redirectTo: '/medicines', pathMatch: 'full' }
];

export const AppRoutingProviders: any[] = [

];


export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);