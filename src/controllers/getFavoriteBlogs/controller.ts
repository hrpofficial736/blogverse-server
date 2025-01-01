import { Request, Response } from "express";
import prisma from "../../prisma/client/prisma-client";

export default async function getFavoriteBlogsControl(
  req: Request,
  res: Response,
) {
  const username = req.params.username.split(":")[1];
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        favorites: true,
      },
    });
    if (!user)
      return res.status(404).json({
        message: "Either user not found or there are no blogs for this user!",
      });
    return res.status(201).json({
      favoriteBlogs: user.favorites,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}
