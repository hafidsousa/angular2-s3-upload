import { IEventPayload } from '../models/models';
import { Context } from 'aws-lambda';

export class LoggingService {

    static log(event: IEventPayload, context: Context, callback) {
        console.log('Event: ' + JSON.stringify(event));
        console.log('Context: ' + JSON.stringify(context));
        console.log('Callback: ' + JSON.stringify(callback));
    }
}

