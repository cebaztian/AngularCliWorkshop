import { Response } from '@angular/http';
import { NgForm } from '@angular/forms';

export class Common {
    static anyControlInvalidAndTouched(ngform: NgForm): Boolean {
        let show = false;
        for (let key in ngform.form.controls) {
            let control = ngform.form.controls[key];
            show = (control.invalid && control.touched) || show;
            if (show) {
                break;
            }
        }

        return show;
    }

    static handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Promise.reject(errMsg);
    }

    static format(args: string[]) {
        var s = args[0];
        for (var i = 0; i < args.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            s = s.replace(reg, args[i + 1]);
        }
        return s;
    }

}
