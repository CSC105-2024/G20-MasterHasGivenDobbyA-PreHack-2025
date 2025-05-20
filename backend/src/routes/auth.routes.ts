import { Hono } from "hono";
import * as authController from "../controllers/auth.controller.ts"

export const AuthRouter = new Hono()

AuthRouter.post("/register", authController.Register);
AuthRouter.post("/login", authController.Login);