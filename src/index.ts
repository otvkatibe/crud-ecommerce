import express, {Express, Request, Response} from 'express';
import { PORT } from './secrets';
import RootRouter from './routes/routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors.middleware';

const app:Express = express()
app.use(express.json())

app.use('/api', RootRouter)
export const prisma = new PrismaClient({
  log: ['query']
})

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})