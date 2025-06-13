import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/error.exception';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import prisma from '../prisma';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Unauthorized', ErrorCode.NO_TOKEN);
        }

        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        const user = await prisma.user.findFirst({ where: {id: payload.userId } });

        if (!user) {
            throw new UnauthorizedException('Unauthorized', ErrorCode.NO_TOKEN);
        }

        (req as any).user = user;
        next();
    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.NO_TOKEN));
    }
}

export default authMiddleware;