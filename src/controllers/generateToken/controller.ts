import jwt from 'jsonwebtoken';

export function generateAccessToken (payload: object) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY});
    return accessToken;
}

export function generateRefreshToken (payload: object) {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {expiresIn:process.env.REFRESH_TOKEN_EXPIRY});
    return refreshToken;
}


