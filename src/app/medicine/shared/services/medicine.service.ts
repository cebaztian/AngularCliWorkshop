import { Common } from './../../../shared/common';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Medicine } from '../models/medicine.model';
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

        return this.http.get(URLMedicine, { headers: headers})
            .toPromise()
            .then(response => response.json() as Medicine[])
            .catch(Common.handleError);
    }
}