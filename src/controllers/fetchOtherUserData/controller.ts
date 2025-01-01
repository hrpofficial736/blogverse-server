import { Request, Response } from "express";
import prisma from "../../prisma/client/prisma-client";

export async function fetchOtherUsersDataControl(req: Request, res: Response) {
  const username = req.params.username;
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        blogs: true,
      },
    });
    if (!userExists) {
      return res.status(404).json({
        status: 404,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      username: userExists.username,
      name: userExists.name,
      image: userExists.image,
      email: userExists.email,
      country: userExists.country,
      profession: userExists.profession,
      description: userExists.description,
      blogs: userExists.blogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error!",
    });
  }
}
