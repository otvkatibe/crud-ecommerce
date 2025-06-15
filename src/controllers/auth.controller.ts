import { Request, Response, NextFunction } from 'express';
import { prisma } from '..';
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequestException } from '../error/bad-requests';
import { ErrorCodes } from '../error/root';
import { UnprocessableEntityException } from '../error/validation';
import { RegisterSchema } from '../schema/user';
import { NotFoundException } from '../error/not-found';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    
    RegisterSchema.parse(req.body);

    const { name, email, password } = req.body
        
    let user = await prisma.user.findFirst({ where: { email } });
    if (user) {
        throw new BadRequestException('User already exists', ErrorCodes.USER_ALREADY_EXISTS)
    }

    user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashSync(password, 10) 
        },
    })
    res.json(user)
}
 
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    let user = await prisma.user.findFirst({ where: { email } })
    if (!user) {
        throw new NotFoundException('User not found', ErrorCodes.USER_NOT_FOUND)
    }

    if (!compareSync(password, user.password)) {
        throw new BadRequestException('Invalid password', ErrorCodes.INCORRECT_PASSWORD)
    }
    const token = jwt.sign( { userId: user.id}, JWT_SECRET)

    res.json({user, token})
}

export const me = async (req: Request, res: Response) => {
    res.json(req.user);
}