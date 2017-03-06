export const BUCKET_NAME: string = 'angular2-s3-upload';
export const S3_GET_OBJECT: string = 'getObject';
export const S3_PUT_OBJECT: string = 'putObject';
export const S3_LIST_OBJECTS: string = 'listObjects';

//TODO Externalise as Env variable.
const ALLOWED_ORIGINS = ['http://localhost:3000', 'https://angular2-s3-upload.s3.amazonaws.com','http://angular-s3-upload-fe.s3-website-ap-southeast-2.amazonaws.com'];

export const HEADERS = (origin: string) => {

    console.log('Origin: ' + origin);

    let allowedOrigin: string = ALLOWED_ORIGINS.find(
        (item) => item === origin
    );

    if (allowedOrigin)
    {
        return {
            'Access-Control-Allow-Origin': allowedOrigin,
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
            'Content-Type': 'application/json'
        }
    }
};

export function GET_VALIDATION_ERROR_STRING(field: string) {
    return `[${field}] is mandatory.`
}