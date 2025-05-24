import { Hono } from "hono";
import * as userController from "../controllers/user.controller.ts";
import { AuthMiddleWare } from "../middlewares/auth.ts";

export const userRouter = new Hono();

userRouter.post("/createuser", userController.createUser);
userRouter.get("/getuser", userController.getUserById);
userRouter.get("/getusername", userController.getUserByUsername);
userRouter.get("/me", AuthMiddleWare, userController.getMe);
