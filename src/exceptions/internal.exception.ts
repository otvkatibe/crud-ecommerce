import { HttpException } from "./error.exception";

export class InternalException extends HttpException {
    constructor(message: string, error: any, errorCode: number) {
        super(message, errorCode, 500, error);
        this.name = "InternalException";
    }

    toString(): string {
        return `InternalException: ${this.message}`;
    }
}

