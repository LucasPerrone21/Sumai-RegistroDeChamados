import { Request, Response, NextFunction } from 'express';
import db from '../database/db';
import jwt from 'jsonwebtoken';

export default function checkRoles(roles: string[]) {
    return async function(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        try {
            const decodedToken = jwt.decode(token as string) as { email: string, permissions: string[] };
            const userPermissionsId = decodedToken.permissions;
            const email = decodedToken.email;
            const user = await db.user.findUnique({where: {email}});
            if(!user){
                return res.status(401).json({ message: 'Usuário não autenticado' });
            }
            if (!userPermissionsId) {
                return res.status(401).json({ message: 'Usuário não autenticado' });
            }


            const databasePermissions = await db.access.findMany({
                where:{ user_id: user.id }
            })

            const userPermissions = databasePermissions.map((item) => item.role);
            const hasPermission = userPermissions.some((permission) => roles.includes(permission));
            if (hasPermission) {
                return next();
            }
            return res.status(401).json({ message: 'Usuário não autorizado' });
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    };
}