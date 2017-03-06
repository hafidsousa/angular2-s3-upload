import { Context } from 'aws-lambda';
import { IEventPayload } from './models/models';
import { LoggingService } from './service/logging-service';
import { HEADERS, BUCKET_NAME, GET_VALIDATION_ERROR_STRING, S3_GET_OBJECT, S3_PUT_OBJECT, S3_LIST_OBJECTS } from './constants';
import AWS = require('aws-sdk');
const UUID = require('uuid/v4');

export function signRequestGetObject(event: IEventPayload, context: Context, callback) {

    // Log Input
    LoggingService.log(
        event,
        context,
        callback
    );

    // Check if key is defined
    if (!event.queryStringParameters!.key)
    {
        callback(
            null,
            {
                statusCode: 400,
                headers: HEADERS(event.headers.origin),
                body: JSON.stringify({
                    reason: GET_VALIDATION_ERROR_STRING('key')
                })
            }
        );

        return;
    }

    // Get S3 instance
    let s3 = new AWS.S3();

    // Get Signed URL
    let signedUrl = s3.getSignedUrl(
        S3_GET_OBJECT,
        {
            Bucket: BUCKET_NAME,
            Key: event.queryStringParameters.key,
            Expires: 300
        }
    );

    // Return Success Response
    callback(
        null,
        {
            statusCode: 200,
            headers: HEADERS(event.headers.origin),
            body: JSON.stringify({
                url: signedUrl
            })
        }
    )
}

export function signRequestPutObject(event: IEventPayload, context: Context, callback) {

    // Log Input
    LoggingService.log(
        event,
        context,
        callback
    );

    // Check if both filename and type are defined
    if (!event.queryStringParameters!.filename || !event.queryStringParameters!.type)
    {
        callback(
            null,
            {
                statusCode: 400,
                headers: HEADERS(event.headers.origin),
                body: JSON.stringify({
                    reason: GET_VALIDATION_ERROR_STRING('filename')
                })
            }
        );

        return;
    }

    // Get S3 instance
    let s3 = new AWS.S3();

    // Get Signed URL
    // Note that some randomness is being prefixed to the S3 key, this will ensure evenly key partitioning and
    // efficiency on read operations.
    let key = `${UUID()}-${event.queryStringParameters.filename}`;

    let signedUrl = s3.getSignedUrl(
        S3_PUT_OBJECT,
        {
            Bucket: BUCKET_NAME,
            Key: key,
            Expires: 60,
            ContentType: event.queryStringParameters.type,
            Metadata: {
                name: event.queryStringParameters.filename
            }
        }
    );

    // Return Success Response
    callback(
        null,
        {
            statusCode: 200,
            headers: HEADERS(event.headers.origin),
            body: JSON.stringify({
                url: signedUrl,
                key: key
            })
        }
    )
}

export function signRequestListObjects(event: IEventPayload, context: Context, callback) {

    // Log Input
    LoggingService.log(
        event,
        context,
        callback
    );

    // Get S3 instance
    let s3 = new AWS.S3();

    // Get Signed URL
    let signedUrl = s3.getSignedUrl(
        S3_LIST_OBJECTS,
        {
            Bucket: BUCKET_NAME,
            Expires: 60
        }
    );

    // Return Success Response
    callback(
        null,
        {
            statusCode: 200,
            headers: HEADERS(event.headers.origin),
            body: JSON.stringify({
                url: signedUrl
            })
        }
    )
}