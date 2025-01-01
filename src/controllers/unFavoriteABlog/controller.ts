import { Request, Response } from "express";
import prisma from "../../prisma/client/prisma-client";

export default async function unFavoriteABlogControl(
  req: Request,
  res: Response,
) {
  const username = req.body.username;
  const blogId = req.body.blogId;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        favorites: true,
      },
    });
    if (!user) return res.status(404).json({ message: "No user found" });
    await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        favorites: {
          disconnect: { id: blogId },
        },
      },
    });
    await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        favoritedBy: {
          disconnect: { id: user.id },
        },
      },
    });
    return res.status(201).json({ message: "Blog removed from favorites" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}
