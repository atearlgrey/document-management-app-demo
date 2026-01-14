import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';

export default [
    { path: 'ids-reports/healthcare', loadComponent: () => import('./ids-reports/healthcare/healthcare.component').then(m => m.HealthcareComponent) },
    { path: 'ids-dashboard', loadComponent: () => import('./ids-dashboard/dashboard.component').then(m => m.DashboardOverviewComponent) },
] as Routes;
