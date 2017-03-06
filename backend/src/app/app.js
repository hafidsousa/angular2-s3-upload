"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logging_service_1 = require("./service/logging-service");
var constants_1 = require("./constants");
var AWS = require("aws-sdk");
var UUID = require('uuid/v4');
function signRequestGetObject(event, context, callback) {
    // Log Input
    logging_service_1.LoggingService.log(event, context, callback);
    // Check if key is defined
    if (!event.queryStringParameters.key) {
        callback(null, {
            statusCode: 400,
            headers: constants_1.HEADERS,
            body: JSON.stringify({
                reason: constants_1.GET_VALIDATION_ERROR_STRING('key')
            })
        });
        return;
    }
    // Get S3 instance
    var s3 = new AWS.S3();
    // Get Signed URL
    var signedUrl = s3.getSignedUrl(constants_1.S3_GET_OBJECT, {
        Bucket: constants_1.BUCKET_NAME,
        Key: event.queryStringParameters.filename,
        Expires: 60
    });
    // Return Success Response
    callback(null, {
        statusCode: 200,
        headers: constants_1.HEADERS,
        body: JSON.stringify({
            url: signedUrl
        })
    });
}
exports.signRequestGetObject = signRequestGetObject;
function signRequestPutObject(event, context, callback) {
    // Log Input
    logging_service_1.LoggingService.log(event, context, callback);
    // Check if filename is defined
    if (!event.queryStringParameters.filename) {
        callback(null, {
            statusCode: 400,
            headers: constants_1.HEADERS,
            body: JSON.stringify({
                reason: constants_1.GET_VALIDATION_ERROR_STRING('filename')
            })
        });
        return;
    }
    // Get S3 instance
    var s3 = new AWS.S3();
    // Get Signed URL
    // Note that some randomness is being prefixed to the S3 key, this will ensure evenly key partitioning and
    // efficiency on read operations.
    var signedUrl = s3.getSignedUrl(constants_1.S3_PUT_OBJECT, {
        Bucket: constants_1.BUCKET_NAME,
        Key: UUID() + "-" + event.queryStringParameters.filename,
        Expires: 60
    });
    // Return Success Response
    callback(null, {
        statusCode: 200,
        headers: constants_1.HEADERS,
        body: JSON.stringify({
            url: signedUrl
        })
    });
}
exports.signRequestPutObject = signRequestPutObject;
function signRequestListObjects(event, context, callback) {
    // Log Input
    logging_service_1.LoggingService.log(event, context, callback);
    // Get S3 instance
    var s3 = new AWS.S3();
    // Get Signed URL
    var signedUrl = s3.getSignedUrl(constants_1.S3_LIST_OBJECTS, {
        Bucket: constants_1.BUCKET_NAME,
        Expires: 60
    });
    // Return Success Response
    callback(null, {
        statusCode: 200,
        headers: constants_1.HEADERS,
        body: JSON.stringify({
            url: signedUrl
        })
    });
}
exports.signRequestListObjects = signRequestListObjects;
