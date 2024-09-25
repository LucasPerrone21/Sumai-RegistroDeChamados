import {Request, Response} from 'express';
import { z } from 'zod';
import db from '../database/db';
import bcrypt from 'bcrypt';
import getUserByToken from '../midlewares/getUserByToken';

export default class UserController {
    async register(req: Request, res: Response) {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }
        const emailSchema = z.string().email();
        const passwordSchema = z.string().min(6);
        const nameSchema = z.string().min(3);
        const emailResult = emailSchema.safeParse(email);
        const passwordResult = passwordSchema.safeParse(password);
        const nameResult = nameSchema.safeParse(name);
        if (!emailResult.success) {
            return res.status(400).json({ message: 'Email Invalido' });
        }
        if (!passwordResult.success) {
            return res.status(400).json({ message: 'Sua senha deve conter pelo menos 6 caracteres' });
        }
        if (!nameResult.success) {
            return res.status(400).json({ message: 'Seu nome deve conter pelo menos 3 caracteres' });
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        // Código para salvar usuário no banco de dados
        try {
            const status = await db.user.create({data: {email, name ,password: hashedPassword}});
            console.log(status);
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error:any) {
            return res.status(500).json({ message: 'Não foi possível cadastrar o usuário' });
        }
    }

    async getUserInfo(req: Request, res: Response) {
        const user = await getUserByToken(req);

        if(!user){
            return res.status(401).json({ message: 'Usuário não autorizado' });
        }

        const formatedUser = {
            email: user.email,
            name: user.name,
            created_at: user.createdAt
        }

        return res.status(200).json(formatedUser);
    }
}

