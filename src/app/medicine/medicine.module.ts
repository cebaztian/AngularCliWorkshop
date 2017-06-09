import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Services
import { MedicineService } from './shared/services/medicine.service';

// routing
import { MedicineRouting } from './medicine.routing';

// Components
import { MedicineListComponent } from './components/list.component';


@NgModule({
    imports: [MedicineRouting, CommonModule, FormsModule],
    exports: [],
    declarations: [MedicineListComponent],
    providers: [{ provide: 'IMedicineService', useClass: MedicineService }],
})
export class MedicineModule { }
