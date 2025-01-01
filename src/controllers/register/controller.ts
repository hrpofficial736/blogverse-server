import { Request, Response } from "express";
import { User } from "../../utils/interfaces/users/interfaces";
import prisma from "../../prisma/client/prisma-client";
import bcrypt from "bcrypt";

export async function registerControl(req: Request, res: Response) {
  const userCredentials = req.body as User;
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: userCredentials.email,
      },
    });

    if (userExists) {
      return res.status(400).json({
        status: 400,
        message: "User with this email already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(userCredentials.password, 10);
    const username = userCredentials.email.split("@")[0];
    await prisma.user.create({
      data: {
        name: userCredentials.name,
        email: userCredentials.email,
        password: hashedPassword,
        username: username,
      },
    });
    res.status(201).json({
      status: 201,
      message: "User created successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
