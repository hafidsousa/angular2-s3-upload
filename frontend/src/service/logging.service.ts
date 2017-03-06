import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class LoggingService implements OnInit {

    ngOnInit(): void {
    }

    constructor() {
    }

    static logPrettyDebugJson(msg: any) {
        console.debug(
            JSON.stringify(msg, null, 2)
        );

        console.debug('--------------------------------');
    }

    public handleError(fullError: any) {

        let error = fullError.json();

        console.error(JSON.stringify(error, null, 2));

        let errMsg;

        if (error.message)
        {
            errMsg = error.message;
        } else if (error.error_description)
        {
            errMsg = error.error_description;
        } else if (error.errText)
        {
            errMsg = error.errText;
        } else
        {
            errMsg = error.status ? `${error.status}` : 'Server error';
        }

        return Observable.throw(errMsg);
    }
}