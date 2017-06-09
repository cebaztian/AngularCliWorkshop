import { Response } from '@angular/http';

export interface ILoggerService {
    log(error: Response | any): any;
}
