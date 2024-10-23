import jwt from 'jsonwebtoken';
import db from '../database/db';

export default class ViewsController{
    async login(req: any, res: any){
        res.render('login', {layout: false});
    }
    async home(req: any, res: any){
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/');
        }
        const decodedToken = jwt.decode(token as string) as { email: string, permission: string };
        const permission = decodedToken.permission;

        if(permission === 'TECHNICAL_ADMIN'){
            return res.render('homeAdmin', {layout: false});
        }else if(permission === 'TECHNICAL_MANAGER'){
            return res.render('homeEncarregados', {layout: false});
        }else if(permission === 'SUPERADMIN' ){
            return res.render('homeSuperAdmin', {layout: false});
        }
    }
    async editarAtendimento(req: any, res: any){
        res.render('editarAtendimento', {layout: false});
    } 

    async cadastrarAtendimento(req: any, res: any){
        res.render('cadastrarAtendimento', {layout: false});
    }

    async verAtendimentos(req: any, res: any){
        res.render('verAtendimentos', {layout: false});
    }
}