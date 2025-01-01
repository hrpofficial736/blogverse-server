import { Request, Response } from "express";
import prisma from "../../prisma/client/prisma-client";
import { User } from "../../utils/interfaces/users/interfaces";

export async function completeProfileControl(req: Request, res: Response) {
  const userUpdateData: User = req.body;
  const username = req.params.username;
  try {
    const userExists = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!userExists) {
      return res.status(404).json({ message: "User not found!" });
    }
    await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        image: `/uploads/${username}/profilePhoto/${req.file?.originalname}`,
        country: userUpdateData.country,
        profession: userUpdateData.profession,
        description: userUpdateData.description,
      },
    });
    return res.status(201).json({
      username: username,
      message: "User updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error!",
    });
  }
}
