import { HttpException, ErrorCodes } from "./root";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes) {
        super(message, errorCode, 401, null);
    }
}

export { ErrorCodes };
