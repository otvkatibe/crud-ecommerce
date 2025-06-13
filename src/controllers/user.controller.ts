import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequestException } from '../exceptions/bad.request';
import { ErrorCode } from '../exceptions/error.exception';
import { UnprocessableEntity } from '../exceptions/unprocessable.entity';
import { NotFoundException } from '../exceptions/not.found';
import { RegisterSchema } from '../schema/users';

export const Register = async (req: Request, res:Response, next: NextFunction ) => {
    RegisterSchema.parse(req.body);
    
    const { name, email, password } = req.body;

    let user = await prisma.user.findFirst({ where: { email: email } })
    if (user) {
        throw new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS)
    }
    user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashSync(password, 10),
        },
    })

    res.json(user)
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await prisma.user.findFirst({ where: { email} });
        
    if (!user) {
        throw new NotFoundException('User not found', ErrorCode.USER_NOT_FOUND);
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestException('Invalid credentials', ErrorCode.INVALID_PASSWORD);
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET)
    res.json({user, token});
}
