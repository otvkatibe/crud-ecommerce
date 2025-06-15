import { Request, Response, NextFunction } from 'express';
import { HttpException, ErrorCodes } from './error/root';
import { InternalException } from './error/internal-exception';
import { ZodError } from 'zod';
import { BadRequestException } from './error/bad-requests';

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            await method(req, res, next)
        } catch (error: any) {
            let exception: HttpException   
            if (error instanceof HttpException) {
                exception = error
            } else {
                if (error instanceof ZodError) {
                    exception = new BadRequestException('Unprocessable entity', ErrorCodes.UNPROCESSABLE_ENTITY)
                } else {
                    exception = new InternalException('Something went wrong', error, ErrorCodes.INTERNAL_EXCEPTION)
                }
            }    
            next(exception)
        }
    }
}