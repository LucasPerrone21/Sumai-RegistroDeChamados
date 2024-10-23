import { Request, Response, NextFunction } from 'express';
import db from '../database/db';
import jwt from 'jsonwebtoken';

export default function checkRoles(permittedRoles: string[]) {
    return async function(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        try {
            const decodedToken = jwt.decode(token as string) as { email: string};
            const email = decodedToken.email;
            const user = await db.user.findUnique({where: {email}});
            console.log(user);
            if(!user){
                return res.status(401).json({ message: 'Usuário não autenticado' });
            }
            if(permittedRoles.includes(user.role)){
                return next()
            } 
            return res.status(401).json({ message: 'Usuário não autorizado' });
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    };
}