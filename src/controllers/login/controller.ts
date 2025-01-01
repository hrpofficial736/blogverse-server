import { Request, Response } from "express";
import { UserForLogIn } from "../../utils/interfaces/users/interfaces";
import bcrypt from "bcrypt";
import prisma from "../../prisma/client/prisma-client";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../generateToken/controller";

export async function loginControl(req: Request, res: Response) {
  const userCredentials: UserForLogIn = req.body;
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        email: userCredentials.email,
      },
    });

    if (userExists) {
      await bcrypt.compare(userCredentials.password, userExists.password);
      const accessToken = generateAccessToken({
        userId: userExists.id,
        userName: userExists.name,
      });
      const refreshToken = generateRefreshToken({ userId: userExists.id });

      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: "User is authenticated!",
          token: accessToken,
          username: userExists.username,
          isProfileCompleted:
            userExists.image &&
            userExists.country &&
            userExists.profession &&
            userExists.description,
        });
    }
  } catch (error) {
    res.status(500).json({
      authenticated: false,
      error: "Internal server error",
    });
  }
}
