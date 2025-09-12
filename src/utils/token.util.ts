import jwt from "jsonwebtoken";

export const UGenerateToken = (payload: {
    id: number;
    username: string;
    email: string;
    name: string;
}): string => {
    const secretKey = process.env.SECRET_KEY || 'secretkey';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}
