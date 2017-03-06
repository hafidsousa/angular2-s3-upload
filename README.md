# angular2-s3-upload
Angular 2 App with a Serverless backend pre-signing S3 bucket requests.


# Goal

To upload files directly from the Browser into the AWS S3 bucket. To meet security and performance requirements, we'll be using a Backend Rest API with AWS API Gateway and Lambda to pre-sign requests so the frontend can securely upload files directly. The backend will play the role as an authenticator signing requests of a particular method (e.g. GET, PUT) for a given period.

This is just an implementation proving the concept and can be further extended to address additional security requirements.

## Backend

* [Serverless Framework](https://serverless.com/)
    * Featuring AWS Cloud Formation Templates to create AWS Lambda Functions and API Gateway
    * Written in Typescript and transpiled into Javascript using Webpack.


## Frontend

* Using seed repo from [https://github.com/AngularClass/angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)
    * Angular 2 written in Typescript


## Demo

[Access Here](http://angular-s3-upload-fe.s3-website-ap-southeast-2.amazonaws.com/)