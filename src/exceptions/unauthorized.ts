import { ErrorCode, HttpException } from "./error.exception";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 401, null);
    }
}