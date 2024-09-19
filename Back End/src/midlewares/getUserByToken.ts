import { Request } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import db from '../database/db';


export default async function getUserByToken(req: Request) {
    const token = req.cookies.token;
    const decodedToken = jwt.decode(token) as { email: string };
    const email = decodedToken?.email;

    if (!email) {
        return null;
    }

    try{
        const user = await db.user.findUnique({where: {email}});
        return user;
    } catch (error) {
        return null;
    }
}