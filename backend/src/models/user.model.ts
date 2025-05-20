import { db } from "../index.ts";

export const isDuplicate = async (username: string) => {
    const user = await db.user.findFirst({
        where: {
            UserName: username
        },
    });
    return user;
}

export const createUser = async (username: string, password: string) => {
    const user = await db.user.create({
        data: {
            UserName: username,
            UserPassword: password,
        },
    });
    return user;
}

export const getUserById = async (id: number) => {
    const user = await db.user.findUnique({
        where: {
            UserId: id
        },
    });
    return user;
}

export const getUserByUsername = async(userName: string) => {
    const user = await db.user.findFirst({
        where: {
            UserName: userName,
        },
    })
    return user
}