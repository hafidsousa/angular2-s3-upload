import { Injectable, OnInit } from '@angular/core';
import { RequestOptionsArgs, Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class S3Service implements OnInit {

    private s3AuthUrl = 'https://thnqahqd1a.execute-api.ap-southeast-2.amazonaws.com/dev';

    ngOnInit(): void {
    }

    constructor(public http: Http,
                public loggingService: LoggingService) {
    }

    listObjects(options?: RequestOptionsArgs): Observable<any> {

        let url: string = `${this.s3AuthUrl}/api/sign-request/list-objects`;

        // Add Content-Type Header Info
        let header = new Headers();
        header.append('Content-Type', 'application/json');

        return this.http.get(
            url,
            {
                headers: header
            }
        )
            .do(response => LoggingService.logPrettyDebugJson(response))
            .map(response => response.json())
            .flatMap((response: Response) => {
                return this.http.get(response.url)
                    .map((response: Response) => {
                        let parseString = require('xml2js').parseString;
                        let jsonResult;
                        parseString(response.text(), (err, _result) => {
                                jsonResult = _result;
                                console.log('Response JSON: ' + JSON.stringify(jsonResult));
                                return jsonResult;
                            }
                        );
                        console.log('Parsed Result: ' + jsonResult);
                        return jsonResult;
                    });
            })
            .catch(this.loggingService.handleError);
    }

    putObject(file, options?: RequestOptionsArgs): Observable<any> {

        let url: string = `${this.s3AuthUrl}/api/sign-request/put-object?filename=${file.name}&type=${file.type}`;

        // Add Content-Type Header Info
        let header = new Headers();
        header.append('Content-Type', file.type);

        return this.http.get(url, options)
            .do(response => LoggingService.logPrettyDebugJson(response))
            .map(response => response.json())
            .flatMap(response => {
                return this.http.put(response.url, file, { headers: header });
            })
            .catch(this.loggingService.handleError);
    }

    getObject(key: string, options?: RequestOptionsArgs): Observable<any> {

        let url: string = `${this.s3AuthUrl}/api/sign-request/get-object?key=${key}`;

        return this.http.get(url, options)
            .do(response => LoggingService.logPrettyDebugJson(response))
            .map(response => response.json())
            .catch(this.loggingService.handleError);
    }
}