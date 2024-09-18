import e, {Request, Response} from 'express';
import { z } from 'zod';
import db from '../../database/db';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import { env } from '../../enviroment/env';


export default class AuthController{
    async login(req: Request, res: Response){
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        const emailSchema = z.string().email();
        const emailResult = emailSchema.safeParse(email);
        if (!emailResult.success) {
            return res.status(401).json({ message: 'Email ou Senha Invalidos' });
        }

        const user = await db.user.findUnique({where: {email}});
        if(!user){
            return res.status(401).json({ message: 'Email ou Senha Invalidos' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(401).json({ message: 'Email ou Senha Invalidos' });
        }


        // Checar permissão do usuário

        try{
            const userPermission = await db.access.findFirst({where:
                {
                    user_id: user.id,
                    OR: [
                        {role: {equals: 'TECHNICAL_MANAGER'}},
                        {role: {equals: 'SUPERADMIN'}}
                    ]
                }});
            console.log(userPermission);
            if(!userPermission){
                return res.status(401).json({ message: 'Usuário não autorizado' });
            }

            const payloadToken = {
                email: user.email,
                permissions: userPermission.company_id
            }
            const secret = env?.APP_SECRET;
            const token = jwt.sign(payloadToken, secret as string, {expiresIn: '8h'});
            
            
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 8 * 60 * 60 * 1000,
                sameSite: 'none'
            });

            res.cookie('permission', userPermission.id, {
                httpOnly: true,
                secure: true,
                maxAge: 8 * 60 * 60 * 1000,
                sameSite: 'none'
            });
    
            return res.status(200).json({ message: 'Login realizado com sucesso' });


        } catch (error) {
            return res.status(500).json({ message: 'Erro ao verificar permissão do usuário' });
        }


    }

    async logout(req: Request, res: Response){
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout realizado com sucesso' });
    }

    async checkAuth(req: Request, res: Response){
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({ message: 'Não autorizado' });
        }

        try {
            const payload = jwt.verify(token, env?.APP_SECRET as string);
            return res.status(200).json({ message: 'Usuário autenticado', user: payload });
        } catch (error) {
            return res.status(401).json({ message: 'Não autorizado' });
        }
    }
}