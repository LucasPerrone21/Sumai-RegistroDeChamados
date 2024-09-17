import db from "../database/db";
import { Request, Response } from "express";
import { z } from "zod";

export default class CompanyController {
    async register(req: Request, res: Response) {
        const {name, email, password, tel, cnpj} = req.body;
        const companySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
            tel: z.string().min(10),
            cnpj: z.string().min(14),
        });
        companySchema.safeParse(req.body);

        const result = companySchema.safeParse(req.body);
        if (result.error) {
            return res.status(400).json({error: result.error});
        }

        await db.companies.create({data: {name, email, password, cnpj,  tel}});
    }

    
}