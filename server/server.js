import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectMongoose from "./config/mongo.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());
app.use(express.urlencoded(true))
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy:false
}))


app.get("/",(req,res)=>{
    return res.status(200).send("Hello World");
})

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/events",eventRouter);


app.use(errorHandler);

const PORT = process.env.APP_PORT;
connectMongoose().then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is running on",PORT);
    })
});
