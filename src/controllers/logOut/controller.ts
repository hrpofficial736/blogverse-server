import { Request, Response } from "express";

export default async function logOutControl(req: Request, res: Response) {
  try {
    res.clearCookie("refreshToken");
    return res.status(202).json({
      message: "Logged out successfully!",
    });
  } catch (error) {
    console.log(error);
  }
}
