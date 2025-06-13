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
import { UnauthorizedException } from '../exceptions/unauthorized';

export const Register = async (req: Request, res:Response, next: NextFunction ) => {
    try {
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
    } catch (error: any) {
        if (error instanceof BadRequestException) {
            throw error;
        }
        throw new UnprocessableEntity(error?.issues || error, 'Validation failed', ErrorCode.UNPROCESSABLE_ENTITY);
    }
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error: any) {
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error;
        }
        throw new UnprocessableEntity(error, 'Login failed', ErrorCode.UNPROCESSABLE_ENTITY);
    }
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        
        if (!user) {
            throw new UnauthorizedException('User not authenticated', ErrorCode.NO_TOKEN);
        }
        
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error: any) {
        if (error instanceof UnauthorizedException) {
            throw error;
        }
        throw new UnprocessableEntity(error, 'Failed to get user info', ErrorCode.UNPROCESSABLE_ENTITY);
    }
}