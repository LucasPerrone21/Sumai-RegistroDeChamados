import jwt from 'jsonwebtoken';
import db from '../database/db';

export default class viewsController{
    async login(req: any, res: any){
        res.render('login', {layout: false});
    }
    async home(req: any, res: any){
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/');
        }
        const decodedToken = jwt.decode(token as string) as { email: string, permissions: string[] };
        const permissions = await db.access.findMany({
            where:{
                id: {
                    in: decodedToken.permissions
                },
            },
            select: {
                role: true
            }
        })

        if(permissions.length === 0){
            return res.redirect('/');
        }

        if(permissions.some(p => p.role === 'SUPERADMIN' || p.role === 'TECHNICAL_ADMIN')){
            return res.render('homeAdmin');
        }else if(permissions.some(p => p.role === 'TECHNICAL_MANAGER')){
            return res.render('homeUser');
        }
    }
}