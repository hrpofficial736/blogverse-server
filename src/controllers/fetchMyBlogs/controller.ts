import { Request, Response } from "express";
import prisma from "../../prisma/client/prisma-client";

export default async function fetchMyBlogsControl(req: Request, res: Response) {
  const username = req.params.username;
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        blogs: true,
      },
    });
    if (!findUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res
      .status(200)
      .json({ message: "Fetched blogs successfully!", data: findUser.blogs });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}
