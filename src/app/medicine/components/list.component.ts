import { Common } from './../../shared/common';
import { Component, OnInit, Inject, trigger, state, style, transition, animate } from '@angular/core';
import { Medicine } from '../shared/models/medicine.model';
import { IMedicineService } from '../shared/services/medicine.contract';


@Component({
  selector: 'app-medicine',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('elementState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active', style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.2)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
    trigger('contentState', [
      state('active', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class MedicineListComponent implements OnInit {

  public medicines: Medicine[];
  public noFilterMedicines: Medicine[];
  private medicineService: IMedicineService;
  public medicineSelected: Medicine = null;
  public showLoading: boolean = false;
  constructor( @Inject('IMedicineService') medicineService: IMedicineService) {
    this.medicineService = medicineService;
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
        console.log(e);
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
        console.log(e);
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
