import { options } from './../resources/urls.resource';
import { LogEntry } from './../models/log.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from './../../../environments/environment';
import { Common } from './../common';
import { ILoggerService } from './logger.service.contract';

@Injectable()
export class LoggerService implements ILoggerService {
    private http: Http;
    private document;
    private URLElasticSearch = 'http://localhost:9200/logstash-'

    constructor(http: Http, @Inject(DOCUMENT) document) {
        this.http = http;
        this.document = document;
    }

    /**
    * Este método registra en elasticsearch las excepciones del proyecto para leer las en kibana
    * @param error
    */
    log(error: Response | any): Promise<any> {
        const message = Common.handleError(error);
        const host = document.location.href || 'localhost';
        const currentDate = new Date();

        // tslint:disable-next-line:max-line-length
        const url = `${this.URLElasticSearch}${currentDate.getUTCFullYear()}.${(currentDate.getUTCMonth() + 1)}.${currentDate.getUTCDate()}/logs`;
        const log: LogEntry = new LogEntry(message, host);

        log['@timestamp'] = currentDate.toISOString();
        this.http.post(url, log, options).toPromise().catch((e) => console.error(`Logger error => ${e}`));

        if (!environment.production) {
            console.clear();

            // tslint:disable-next-line:no-console
            console.debug(message);
        }
        return Promise.reject(message);
    }
}
