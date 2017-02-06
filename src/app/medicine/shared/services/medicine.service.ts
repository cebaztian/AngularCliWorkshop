import { Medicine } from './../models/medicine.model';
import { Common } from './../../../shared/common';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { IMedicineService } from './medicine.contract';
import { URLMedicine } from '../../../shared/resources/urls.resource';

@Injectable()
export class MedicineService implements IMedicineService {

    private http: Http;
    constructor(http: Http) {
        this.http = http;
    }

    getAll(): Promise<Medicine[]> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

        return this.http.get(URLMedicine, { headers: headers })
            .toPromise()
            .then(response => response.json() as Medicine[])
            .catch(Common.handleError);
    }

    delete(id: number): Promise<Medicine> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

        return this.http.delete(`${URLMedicine}/${id}`, { headers: headers })
            .toPromise()
            .then(response => response.json() as Medicine)
            .catch(Common.handleError);
    }

    save(medicine: Medicine): Promise<Medicine> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

        if (!medicine.Id || medicine.Id <= 0) {
            return this.http.post(`${URLMedicine}`, medicine, { headers: headers })
                .toPromise()
                .then(response => response.json() as Medicine)
                .catch(Common.handleError);
        } else {
            return this.http.put(`${URLMedicine}/${medicine.Id}`, medicine, { headers: headers })
                .toPromise()
                .then(response => response.json() as Medicine)
                .catch(Common.handleError);
        }
    }
}
