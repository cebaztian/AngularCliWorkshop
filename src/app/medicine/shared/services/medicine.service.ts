import { ILoggerService } from './../../../shared/services/logger.service.contract';
import { Medicine } from './../models/medicine.model';
import { Common } from './../../../shared/common';
import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IMedicineService } from './medicine.contract';
import { URLMedicine } from '../../../shared/resources/urls.resource';

@Injectable()
export class MedicineService implements IMedicineService {

    private http: Http;
    private loggerService: ILoggerService;

    constructor(http: Http, @Inject('ILoggerService') loggerService: ILoggerService) {
        this.http = http;
        this.loggerService = loggerService;
    }

    getAll(): Promise<Medicine[]> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

        return this.http.get(URLMedicine, { headers: headers })
            .toPromise()
            .then(response => response.json() as Medicine[])
            .catch((e) => this.loggerService.log(e));
    }

    delete(id: number): Promise<Medicine> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

        return this.http.delete(`${URLMedicine}/${id}`, { headers: headers })
            .toPromise()
            .then(response => response.json() as Medicine)
            .catch((e) => this.loggerService.log(e));
    }

    save(medicine: Medicine): Promise<Medicine> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

        if (!medicine.Id || medicine.Id <= 0) {
            return this.http.post(`${URLMedicine}`, medicine, { headers: headers })
                .toPromise()
                .then(response => response.json() as Medicine)
                .catch((e) => this.loggerService.log(e));
        } else {
            return this.http.put(`${URLMedicine}/${medicine.Id}`, medicine, { headers: headers })
                .toPromise()
                .then(response => response.json() as Medicine)
                .catch((e) => this.loggerService.log(e));
        }
    }
}
