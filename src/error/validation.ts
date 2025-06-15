import { ErrorCodes, HttpException } from "./root";

export class UnprocessableEntityException extends HttpException {
    constructor(message: string, errors: any, errorCode: number) {
        super(message, errorCode, 422, errors);
    }
}