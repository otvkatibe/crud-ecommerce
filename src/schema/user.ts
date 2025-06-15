import { z } from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
})

export const AdressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().optional(),
    posterCode: z.string(),
    country: z.string(),
    city: z.string(),
    userId: z.number()
})

export const UserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddress: z.number().optional(),
    defaultBillingAddress: z.number().optional(),
})