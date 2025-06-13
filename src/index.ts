import express, {Express, Request, Response} from "express";
import rootRouter from "./routes/root.route";
import dotenv from "dotenv";
import { PORT } from "./secrets";
import { errorMiddleware } from "./middlewares/errors";

const app:Express = express();

app.use(express.json());

app.get("/", (req:Request, res: Response) => {
    res.send("API IS RUNNING!");
});

app.use('/api', rootRouter);

app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

