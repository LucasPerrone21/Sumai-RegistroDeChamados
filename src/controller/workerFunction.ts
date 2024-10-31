import { Request, Response } from 'express';
import db from '../database/db';
import { z } from 'zod';

export class WorkerFunctionController {
    async register(req: Request, res: Response) {
        const {name, id_company} = req.body;
        const workerSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            tel: z.string().min(10),
            cpf: z.string().min(11),
            company_id: z.number(),
        });
        workerSchema.safeParse(req.body);

        const result = workerSchema.safeParse(req.body);
        if (result.error) {
            return res.status(400).json({error: result.error});
        }

        await db.workerFunction.create({data: {name, id_company}});
    }

    async list(req: Request, res: Response) {
        try {
            const workers = await db.workerFunction.findMany();
            return res.json(workers);
        }
        catch (error) {
            return res.status(500).json({error: "Não foi possível listar os funcionários"});
        }
    }

    async show(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const worker = await db.workerFunction.findUnique({where: {id: Number(id)}});
            return res.json(worker);
        }
        catch (error) {
            return res.status(500).json({error: "Não foi possível listar o funcionário"});
        }
    }
}