import { ErrorCode, HttpException } from "./error.exception";

export class BadRequestService extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, null);
        this.name = 'BadRequestService';
    }
}