import Router from "express";
import auth from "../middlewares/auth.js";
import { getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", auth, getUser);

export default userRouter;