import { Request, Response } from "express";
import prisma from "../../prisma/client/prisma-client";

export default async function fetchUsersControl(req: Request, res: Response) {
  const input = req.params.input;
  try {
    const findUsers = await prisma.user.findMany({
      where: {
        OR: [
          { username: { startsWith: input } },
          { name: { startsWith: input } },
        ],
      },
    });
    if (findUsers.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }
    return res.status(200).json({ users: findUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}
