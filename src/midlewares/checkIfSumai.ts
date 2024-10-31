import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function checkIfSumai(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    const decodedToken = jwt.decode(token);
    console.log(decodedToken);
    next();  
}