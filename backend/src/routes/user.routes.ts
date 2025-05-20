import { Hono } from "hono";
import * as userController from '../controllers/user.controller.ts';

export const userRouter = new Hono();

userRouter.post('/createuser', userController.createUser);
userRouter.get('/getuser', userController.getUserById);
userRouter.get('/getusername', userController.getUserByUserame);