import { Request, Response } from 'express';
import { prisma } from '../index';
import { NotFoundException } from '../error/not-found';
import { ErrorCodes } from '../error/root';

export const createProduct = async (req: Request, res: Response) => {

    const product = await prisma.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(','),
        }
    })
    res.json(product);
}

export const updateProduct = async (req: Request, res: Response) => {
    try{
        const product = req.body
        if(product.tags){
            product.tags = product.tags.join(',')
        }

        const updatedProduct = await prisma.product.update({
            where: { id: +req.params.id},
            data: product
        })
        res.json(updatedProduct);
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCodes.PRODUCT_NOT_FOUND)
    }
}


export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = +req.params.id
        
        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });
        
        if (!existingProduct) {
            throw new NotFoundException('Product not found', ErrorCodes.PRODUCT_NOT_FOUND)
        }
        
        await prisma.product.delete({
            where: { id: productId }
        });
        
        res.json({ 
            message: 'Product deleted successfully',
            success: true 
        });
    } catch (error) {
        throw new NotFoundException('Product not found', ErrorCodes.PRODUCT_NOT_FOUND)
    }
}

export const listProducts = async (req: Request, res: Response) => {
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const take = req.query.take ? Number(req.query.take) : 10

    const count = await prisma.product.count();
    const products = await prisma.product.findMany({
        skip: skip,
        take: take
    })

    res.json({ count, data: products })
}

export const getProductbyId = async (req: Request, res: Response) => {
    try {
        
        const product = await prisma.product.findFirstOrThrow({
            where: { id: +req.params.id }
        })
        
        if (!product) {
            throw new NotFoundException('Product not found', ErrorCodes.PRODUCT_NOT_FOUND)
        }
        
        res.json(product)
    } catch (error) {
        console.log(error)
        throw new NotFoundException('Product not found', ErrorCodes.PRODUCT_NOT_FOUND)
    }
}
