import { Request, Response } from 'express';
import { AdressSchema } from '../schema/user';
import { NotFoundException } from '../error/not-found';
import { User } from '@prisma/client';
import { prisma } from '..';
import { ErrorCodes } from '../error/root';

export const addAddress = async (req: Request, res: Response) => {
    AdressSchema.parse(req.body)

    const address = await prisma.adress.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    })
    res.json(address)
}

export const deleteAddress = async (req: Request, res: Response) => {
    try {
        const addressId = +req.params.id

        const existingAddress = await prisma.adress.findFirstOrThrow({
            where: { id: addressId }
        });

        if (!existingAddress) {
            throw new NotFoundException('Address not found', ErrorCodes.ADRESS_NOT_FOUND)
        }

        if (existingAddress.userId !== req.user.id) {
            throw new NotFoundException('You are not authorized to delete this address', ErrorCodes.UNAUTHORIZED)
        }

        await prisma.adress.delete({
            where: { id: addressId }
        });

        res.json({
            message: 'Address deleted successfully',
            success: true
        });
    } catch (error) {
        throw new NotFoundException('Address not found', ErrorCodes.ADRESS_NOT_FOUND)
    }
}

export const listAdresses = async (req: Request, res: Response) => {
    const adresses = await prisma.adress.findMany({
        where: { userId: req.user.id }
    })

    if (!adresses || adresses.length === 0) {
        throw new NotFoundException('No addresses found', ErrorCodes.ADRESS_NOT_FOUND)
    }

    res.json(adresses)
}
