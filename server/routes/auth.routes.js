import Router from "express";
import { register, login, logout, isAuthenticate } from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.js";

const authRouter = Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/logout",auth,logout);
authRouter.post("/is-auth", auth, isAuthenticate )

export default authRouter;