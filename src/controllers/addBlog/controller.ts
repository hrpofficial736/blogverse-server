import { Request, Response } from "express";
import { Blog } from "@prisma/client";
import prisma from "../../prisma/client/prisma-client";

export default async function addBlog(req: Request, res: Response) {
  const username = req.params.username;
  const blog: Blog = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    const addBlog = await prisma.blog.create({
      data: {
        title: blog.title,
        blogDescription: blog.blogDescription,
        category: blog.category,
        authorName: user?.name!,
        coverImage: `/uploads/${username}/blogImage/${req.file?.originalname}`,
        authorId: user?.id!,
      },
    });
    await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        blogs: {
          connect: { id: addBlog.id },
        },
      },
    });
    return res.status(200).json({ message: "Blog Uploaded Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}
