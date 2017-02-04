import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicineListComponent } from './components/list.component';

const medicinesRoutes: Routes = [
    {
        path: 'medicines',
        component: MedicineListComponent
    }
];

export const MedicineRouting: ModuleWithProviders = RouterModule.forChild(medicinesRoutes);