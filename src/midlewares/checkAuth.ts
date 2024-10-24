import e, { Request, Response } from 'express';
import { env } from '../enviroment/env';
import jwt from 'jsonwebtoken';

export default function checkAuth(req: Request, res: Response, next: Function) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Token não informado' });
    }
    try {
        jwt.verify(token, env?.APP_SECRET as string);
        return next();
    }catch (error) {
        return res.status(401).json({ message: 'Acesso negado' });
    }
}