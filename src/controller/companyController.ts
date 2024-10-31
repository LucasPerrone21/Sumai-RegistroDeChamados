import db from "../database/db";
import { Request, Response } from "express";
import { z } from "zod";

export default class CompanyController {
    async register(req: Request, res: Response) {
        const {name, email, tel, cnpj} = req.body;
        const companySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            tel: z.string().min(10),
            cnpj: z.string().min(14),
        });
        companySchema.safeParse(req.body);

        const result = companySchema.safeParse(req.body);
        if (result.error) {
            console.log(result.error);
            return res.status(400).json({error: result.error});
        }

        await db.companies.create({data: {name, email, cnpj,  tel}});
    }

    async list(req: Request, res: Response) {
        try {
            const companies = await db.companies.findMany();
            return res.json(companies);
        }
        catch (error) {
            return res.status(500).json({error: "Não foi possível listar as empresas"});
        }
    }

    async show(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const company = await db.companies.findUnique({where: {id: Number(id)}});
            return res.json(company);
        }
        catch (error) {
            return res.status(500).json({error: "Não foi possível listar a empresa"});
        }
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const {name, email, tel, cnpj} = req.body;
        try {
            await db.companies.update({where: {id: Number(id)}, data: {name, email, tel, cnpj}});
            return res.json({message: "Empresa atualizada com sucesso"});
        }
        catch (error) {
            return res.status(500).json({error: "Não foi possível atualizar a empresa"});
        }
    }

    
}