import { HttpException } from "./error.exception";

export class UnprocessableEntity extends HttpException {
    constructor(error: any, message: string, errorCode: number) {
        super(message, errorCode, 422, error);
        this.name = 'UnprocessableEntity';
    }
}


