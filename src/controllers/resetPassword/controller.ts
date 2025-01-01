import { Request, Response } from "express";
import prisma from "../../prisma/client/prisma-client";
import bcrypt from "bcrypt";

export default async function resetPasswordControl(
  req: Request,
  res: Response,
) {
  const username = req.params.username;
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) return res.status(404).json({ message: "User not found!" });
    const hash = await bcrypt.hash(newPassword, 10);
    const checkForOldPassword = await bcrypt.compare(
      oldPassword,
      user.password,
    );
    if (checkForOldPassword) {
      await prisma.user.update({
        where: {
          username: username,
        },
        data: {
          password: hash,
        },
      });
      return res
        .status(202)
        .json({ message: "Password updated successfully!" });
    }
    return res.status(400).json({ message: "Wrong Password" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}
