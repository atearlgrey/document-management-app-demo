import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import {
    PublicServiceCenterComponent
} from '@/pages/ids-public-service-center/public-service-center/public-service-center-component';
import {
    AdministrativeProceduresIndexComponent
} from '@/pages/ids-public-service-center/administrative-procedures-index/administrative-procedures-index-component';
import { HomeAffairsComponent } from '@/pages/ids-social-cultural/home-affairs/home-affairs-component';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'public-service-center', component: PublicServiceCenterComponent },
    { path: 'public-service-center/administrative-procedures-index', component: AdministrativeProceduresIndexComponent },
    { path: 'social-cultural/home-affairs', component: HomeAffairsComponent },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
