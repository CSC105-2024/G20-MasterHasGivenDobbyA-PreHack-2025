import type { Context } from "hono";
import { ConstructResponse } from "../utils/constructResponse.ts";
import * as userModel from "../models/user.model.ts"
import * as bcrypt from "bcrypt"
import * as jwt from "hono/jwt"
import { setCookie } from "hono/cookie"

type RegisterPayload = {
    username: string;
    password: string;
}

type LoginPayload = {
    username: string;
    password: string;
}

export const Register = async (c: Context) => {
    try {
        const body = await c.req.json<RegisterPayload>();
        if (!body.password || !body.username) {
            return c.json(ConstructResponse(false, "Missing Required Field"), 400)
        }

        // Check user duplicate
        const user = await userModel.getUserByUsername(body.username);

        if (user) {
            return c.json(ConstructResponse(false, "Username already existed"), 400)
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await userModel.createUser(body.username, hashedPassword);

        return c.json(ConstructResponse(true, "User created!", { id: newUser.UserId }), 201)

    } catch (e) {
        console.log(e);

        return c.json(ConstructResponse(false, `Internal Server Error`, e), 500)
    }
}

export const Login = async (c: Context) => {
    try {
        const body = await c.req.json<LoginPayload>();

        if (!body.username || !body.password) return c.json(ConstructResponse(false, "Missing Required field"), 400)

        const user = await userModel.getUserByUsername(body.username);

        if (!user) return c.json(ConstructResponse(false, "User not found"), 400)

        const isPasswordMatch = await bcrypt.compare(body.password, user.UserPassword);

        if (!isPasswordMatch) return c.json(ConstructResponse(false, "Incorrect Password"), 400)

        const jwtPayload = {
            id: user.UserId
        }

        const SECRET = process.env.JWT_SECRET;

        if (!SECRET) throw new Error("Missing JWT_SECRET in .env file")

        const token = await jwt.sign(jwtPayload, SECRET)

        setCookie(c, "authToken", token)

        return c.json(ConstructResponse(true, "Login Success!"), 200)

    } catch (e) {
        console.log(e);

        return c.json(ConstructResponse(false, `Internal Server Error`, e), 500)
    }
}