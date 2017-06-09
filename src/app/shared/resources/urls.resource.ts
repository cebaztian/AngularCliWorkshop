import { RequestOptions, Headers } from '@angular/http';
import { environment } from './../../../environments/environment';

export const URLMedicine = `http://webapiworkshop.azurewebsites.net/api/Medicines`;

const headers = new Headers({ 'Content-Type': 'application/json' });
headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
export const options = new RequestOptions({ headers: headers });
export const optionsCredentials = new RequestOptions({ headers: headers, withCredentials: true });
