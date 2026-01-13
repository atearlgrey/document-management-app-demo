import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { HealthcareComponent } from './ids-reports/healthcare/healthcare-component';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'ids-reports/healthcare', component: HealthcareComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
