# angular2-s3-upload
Angular 2 App with a Serverless backend pre-signing S3 bucket requests.

# Problem

There are few ways one can write client-side code to perform operations in an AWS S3 Bucket.

1. Authenticate with an Identity Provider (e.g. AWS Cognito) and then request upload from the client-side to AWS S3 directly.
2. Write a backend API to act as a proxy. In this case, the request will flow as Client App --> Backend --> AWS S3 Bucket. While it's secure, it adds unnecessary overhead in the backend API.
3. Write a backend API to pre-sign requests. In this case, the client-side app will ask for permission to upload a file and then upload the file directly.
The first step is to request for a pre-signed URL as Browser --> Backend API. Then, with a pre-signed URL upload the file directly to the S3 bucket as Client App --> AWS S3 bucket. In this model, the Client side will perform HTTP operations, and no AWS-SDK dependencies are needed in the Client App.

The third option will be demonstrated in this project.

Note: It's also possible to store AWS Credentials in the Client Side App and upload files directly. This should always be avoided as sensitive information (AWS Credentials) will be shared in the client-side.

# Goal

To upload files directly from the Browser into the AWS S3 bucket. To meet security and performance requirements, we'll be using a Backend Rest API with AWS API Gateway and Lambda to pre-sign requests so the frontend can securely upload files directly. The backend will play the role as an authenticator signing requests of a particular method (e.g. GET, PUT) for a given period.

This is just an implementation proving the concept and can be further extended to address additional security requirements.

## Backend

* [Serverless Framework](https://serverless.com/)
    * Featuring AWS Cloud Formation Templates to create AWS Lambda Functions and API Gateway endpoints.
    * Written in Typescript and transpiled into Javascript using Webpack.


## Frontend

* Using seed repo from [Angular 2 Webpack Starter](https://github.com/AngularClass/angular2-webpack-starter)
    * Angular 2 written in Typescript


## Demo

[Access Here](http://angular-s3-upload-fe.s3-website-ap-southeast-2.amazonaws.com/)