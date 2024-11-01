import {Request, Response} from 'express';
import { z } from 'zod';
import db from '../database/db';
import bcrypt from 'bcrypt';
import getUserByToken from '../midlewares/getUserByToken';

export default class UserController {
    async register(req: Request, res: Response) {
        const { email, password, name, role, company } = req.body;
        if (!email || !password || !name || !role || !company) {
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
        const formatedCompany = parseInt(company);

        // Código para salvar usuário no banco de dados
        try {
            const status = await db.user.create({data: {
                email,
                name,
                password: hashedPassword,
                role,
                company: {connect: {id: formatedCompany}}
            }});
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error:any) {
            return res.status(500).json({ message: 'Não foi possível cadastrar o usuário', error: error });
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

    async getAllUsers(req: Request, res: Response) {
        try{
            const users = await db.user.findMany({select:{
                id: true,
                email: true,
                name: true,
                company: true,
                role: true,
            }});

            return res.status(200).json(users);
        }
        catch(error:any){
            return res.status(500).json({ message: 'Não foi possível listar os usuários', error: error });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        if (!id) {
            return res.status(400).json({ message: 'Informe o id do usuário' });
        }
        try {
            const user = await db.user.findUnique({where: {id}, select:{
                id: true,
                email: true,
                name: true,
                company: true,
                role: true,
            }});
            if(!user){
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            return res.status(200).json(user);
        } catch (error:any) {
            return res.status(500).json({ message: 'Não foi possível buscar o usuário', error: error });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        const { email, name, role, company, password } = req.body;
        if (!id || !email || !name || !role || !company) {
            console.log(req.body);
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }

        const emailSchema = z.string().email();
        const nameSchema = z.string().min(3);
        const emailResult = emailSchema.safeParse(email);
        const nameResult = nameSchema.safeParse(name);

        let codedPassword: null | string = null
        if(password){
            const passwordSchema = z.string().min(6);
            const passwordResult = passwordSchema.safeParse(password);
            if (!passwordResult.success) {
                return res.status(400).json({ message: 'Sua senha deve conter pelo menos 6 caracteres' });
            }
            codedPassword = await bcrypt.hash(password, 15);
        }


        if (!emailResult.success) {
            return res.status(400).json({ message: 'Email Invalido' });
        }
        if (!nameResult.success) {
            return res.status(400).json({ message: 'Seu nome deve conter pelo menos 3 caracteres' });
        }
        const formatedCompany = parseInt(company);

        try {
            const user = await db.user.findUnique({where: {id}});
            if(!user){
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            await db.user.update({where: {id}, data: {
                email,
                name,
                role,
                company: {connect: {id: formatedCompany}},
                password: typeof codedPassword === 'string' ? codedPassword : user.password
            }});
            return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error:any) {
            return res.status(500).json({ message: 'Não foi possível atualizar o usuário', error: error });
        }
    }
}

