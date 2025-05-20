import { Hono } from "hono";
import { songsRouter } from "./song.routes.ts";
import { userRouter } from "./user.routes.ts";
import { AuthRouter } from "./auth.routes.ts";
import { AuthMiddleWare } from "../middlewares/auth.ts";

export const mainRouter = new Hono();

mainRouter.route('/user', userRouter);
mainRouter.route('/auth', AuthRouter)

mainRouter.use(AuthMiddleWare)
mainRouter.route('/song', songsRouter);