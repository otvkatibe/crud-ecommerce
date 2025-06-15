import { NextFunction, Request, Response } from "express";  
import { UnauthorizedException } from "../error/unauthorized";
import { ErrorCodes } from "../error/root";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets";
import { prisma } from "..";

export const authMiddleware = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token){
        return next(new UnauthorizedException('No token provided', ErrorCodes.UNAUTHORIZED));
    }

    try{
        const payload = jwt.verify(token, JWT_SECRET) as any
        const user = await prisma.user.findFirst({ where: { id: payload.userId } });
        
        if (!user) {
            return next(new UnauthorizedException('User not found', ErrorCodes.UNAUTHORIZED));
        }
    
        req.user = user;
        next();
    } catch (error) {
        return next(new UnauthorizedException('Invalid token', ErrorCodes.UNAUTHORIZED));
    }
}