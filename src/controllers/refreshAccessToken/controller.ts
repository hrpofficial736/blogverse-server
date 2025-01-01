import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateAccessToken } from "../generateToken/controller";

export default async function refreshAccessTokenControl(
  req: Request,
  res: Response,
) {
  try {
    const refreshTokenFromCookie = req.cookies.refreshToken;
    if (!refreshTokenFromCookie)
      return res.status(404).json({ message: "Refresh token missing!" });
    const decoded: JwtPayload | string = jwt.verify(
      refreshTokenFromCookie,
      process.env.REFRESH_TOKEN_SECRET!,
    );
    if (typeof decoded === "string") {
      throw new Error("Invalid refresh token payload");
    }
    const { userId } = decoded;
    if (!userId) throw new Error("UserId not found in the payload!");
    const newAccessToken = generateAccessToken({ userId: decoded.userId });
    return res.status(200).json({
      message: "Generated new access token",
      newAccessToken,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
}
