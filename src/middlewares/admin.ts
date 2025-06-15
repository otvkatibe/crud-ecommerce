import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../error/unauthorized";
import { ErrorCodes } from "../error/root";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user.role == 'ADMIN') {
        next()
    } 
    else {
        next(new UnauthorizedException('You are not authorized to perform this action', ErrorCodes.UNAUTHORIZED));
    }
}
