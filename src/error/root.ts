export class HttpException extends Error {
    message: string;
    errorCode: ErrorCodes;
    statusCode: number;
    errors: ErrorCodes;

    constructor(message: string, errorCode: ErrorCodes, statusCode: number, error: any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}

export enum ErrorCodes {
    UNAUTHORIZED = 1000,
    INCORRECT_PASSWORD = 1001,
    USER_NOT_FOUND = 1002,
    USER_ALREADY_EXISTS = 1003,
    BAD_REQUEST = 1004,
    INTERNAL_EXCEPTION = 1005,
    UNPROCESSABLE_ENTITY = 1006,
    PRODUCT_NOT_FOUND = 1007,
    ADRESS_NOT_FOUND = 1008,
}