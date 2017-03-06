export interface IResponsePayload {
    statusCode: number;
    headers: any;
    body: string;
}

export interface IQueryParameters {
    key: string;
    filename: string;
    type: string;
}

export interface IEventPayload {
    headers: any,
    method: string;
    queryStringParameters: IQueryParameters;
    body: any;
}

export interface ICallback {
    (error: any,
     result: IResponsePayload): void;
}