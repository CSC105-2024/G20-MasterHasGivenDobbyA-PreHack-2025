import type { Context } from "hono";
import * as userModel from "../models/user.model.ts";
import { ConstructResponse } from "../utils/constructResponse.ts";

type creatUserBody = {
  username: string;
  password: string;
};

export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json<creatUserBody>();
    if (!body.username || !body.password)
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );

    if (await userModel.isDuplicate(body.username)) {
      return c.json({
        success: false,
        data: null,
        msg: "Username or Password was already exist!!!",
      });
    }

    const newUser = await userModel.createUser(body.username, body.password);
    return c.json(
      {
        success: true,
        data: newUser,
        msg: "Created new user successfull",
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

export const getUserById = async (c: Context) => {
  try {
    const param = c.req.query("id");
    if (param !== undefined && param !== null) {
      const data = await userModel.getUserById(parseInt(param));
      return c.json(data, 200);
    }
    return c.json({
      success: false,
      data: null,
      msg: "Missing requires fields",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

export const getUserByUsername = async (c: Context) => {
  try {
    const param = c.req.query("username") || "";

    if (!param.trim()) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Username is required",
        },
        400
      );
    }

    const data = await userModel.getUserByUsername(param);
    return c.json(
      {
        success: true,
        data: data,
      },
      200
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: "Missing required field",
      },
      500
    );
  }
};

export const getMe = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const user = await userModel.getUserById(userId);

    if (!user) {
      return c.json(ConstructResponse(false, "User not found"), 404);
    }

    return c.json(
      ConstructResponse(true, "User found", {
        id: user.UserId,
        username: user.UserName,
      })
    );
  } catch (e) {
    return c.json(ConstructResponse(false, "Internal Server Error", e), 500);
  }
};
