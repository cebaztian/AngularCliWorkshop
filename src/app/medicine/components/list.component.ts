import { ILoggerService } from './../../shared/services/logger.service.contract';
import { Common } from './../../shared/common';
import { Component, OnInit, Inject, trigger, state, style, transition, animate } from '@angular/core';
import { Medicine } from '../shared/models/medicine.model';
import { IMedicineService } from '../shared/services/medicine.contract';


@Component({
  selector: 'app-medicine',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MedicineListComponent implements OnInit {

  public medicines: Medicine[];
  public noFilterMedicines: Medicine[];
  private medicineService: IMedicineService;
  private loggerService: ILoggerService;

  public medicineSelected: Medicine = null;
  public showLoading = false;

  constructor( @Inject('IMedicineService') medicineService: IMedicineService
    , @Inject('ILoggerService') loggerService: ILoggerService) {
    this.medicineService = medicineService;
    this.loggerService = loggerService;
  }

  ngOnInit() {
    this.showLoading = true;
    this.getAll();
  }

  set filterName(value: string) {
    this.filter(value);
  }

  getAll(): void {
    this.medicineService.getAll()
      .then(medicines => {
        this.medicines = medicines;
        this.noFilterMedicines = medicines;
        this.showLoading = false;
      })
      .catch((e) => {
        this.medicines = null;
        this.showLoading = false;
        this.loggerService.log(e);
      });
  }

  delete(id: number): void {
    this.showLoading = true;
    this.medicineService.delete(id)
      .then(() => {
        this.getAll();
        if (this.medicineSelected && id === this.medicineSelected.Id) {
          this.medicineSelected = null;
        }
      }).catch((e) => {
        this.showLoading = true;
        this.medicineSelected = null;
        this.loggerService.log(e);
      });

  }

  newMedicine(): void {
    this.medicineSelected = new Medicine();
  }

  save(): void {
    this.showLoading = true;
    this.medicineService.save(this.medicineSelected)
      .then(medicine => {
        this.getAll();
        this.medicineSelected = null;
      })
      .catch((e) => {
        this.medicineSelected = null;
        this.showLoading = true;
        this.loggerService.log(e);
      });

  }

  filter(filter: string): void {
    if (filter.length > 0) {
      filter = filter.toLowerCase();
      this.medicines = this.noFilterMedicines.filter(medicine =>
        medicine.Name.toLowerCase().includes(filter)
      );
    } else {
      this.medicines = this.noFilterMedicines;
    }
  }

}
