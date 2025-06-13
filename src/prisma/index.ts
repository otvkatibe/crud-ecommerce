import { PrismaClient } from '@prisma/client'
import { RegisterSchema } from '../schema/users';

const prisma = new PrismaClient()

export default prisma
