import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequestService } from '../exceptions/bad.request';
import { ErrorCode } from '../exceptions/error.exception';
import { UnprocessableEntity } from '../exceptions/unprocessable.entity';
import { RegisterSchema } from '../schema/users';

export const Register = async (req: Request, res:Response, next: NextFunction ) => {
    try {
    RegisterSchema.parse(req.body);
    
    const { name, email, password } = req.body;

    let user = await prisma.user.findFirst({ where: { email: email } })
    if (user) {
        return next(new BadRequestService('User already exists', ErrorCode.USER_ALREADY_EXISTS))
    }
    user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashSync(password, 10),
        },
    })

    res.json(user)
    } catch (error: any) {
        return next(new UnprocessableEntity(error?.issues || error, UnprocessableEntity.name, ErrorCode.UNPROCESSABLE_ENTITY));
    }
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        let user = await prisma.user.findFirst({ where: { email} });
        
        if (!user) {
            return next(new BadRequestService('User not found', ErrorCode.USER_NOT_FOUND));
        }

        if (!compareSync(password, user.password)) {
            return next(new BadRequestService('Invalid password', ErrorCode.INVALID_PASSWORD));
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET)
        res.json({user, token});
    } catch (error: any) {
        return next(new UnprocessableEntity(error?.issues || error, UnprocessableEntity.name, ErrorCode.UNPROCESSABLE_ENTITY));
    }
}
