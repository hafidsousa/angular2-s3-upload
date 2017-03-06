"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUCKET_NAME = 'angular2-s3-upload';
exports.S3_GET_OBJECT = 'getObject';
exports.S3_PUT_OBJECT = 'putObject';
exports.S3_LIST_OBJECTS = 'listObjects';
exports.HEADERS = {
    'Access-Control-Allow-Origin': 'https://angular2-s3-upload.s3.amazonaws.com',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Content-Type': 'application/json'
};
function GET_VALIDATION_ERROR_STRING(field) {
    return "[" + field + "] is mandatory.";
}
exports.GET_VALIDATION_ERROR_STRING = GET_VALIDATION_ERROR_STRING;
