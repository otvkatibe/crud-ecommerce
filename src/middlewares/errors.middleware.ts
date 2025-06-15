import { Request, Response, NextFunction } from "express";
import { HttpException } from "../error/root";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    
    console.log('Error')
    res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors,
    })
}