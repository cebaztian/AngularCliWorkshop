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
  private medicineService: IMedicineService;
  public noContent: boolean = false;

  constructor( @Inject('IMedicineService') medicineService: IMedicineService) {
    this.medicineService = medicineService;
  }

  ngOnInit() {
    this.getAll();
  }


  getAll() {
    this.medicineService.getAll()
      .then(medicines => this.medicines = medicines)
      .then(medicines => {
        this.noContent = (medicines == null);
      })
      .catch((e) => {
        this.noContent = true;
      });
  }

}
