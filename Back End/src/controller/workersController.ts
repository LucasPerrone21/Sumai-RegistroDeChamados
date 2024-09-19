import { Request, Response } from "express";
import db from "../database/db";


export class WorkersController {
    async getWorkers(req: Request, res: Response) {
        const permission = req.cookies.permission;
        try {
            const company = await db.access.findFirst({
                where:{
                    id: permission
                },
                select: {
                    company_id: true
                }
            })
        

            const workers = await db.workers.findMany({
                select: {
                    id: true,
                    name: true,
                    function: {
                        select: {
                            name: true,
                        },
                    },
                },
                where:{
                    company: {
                        id: company?.company_id ?? -1
                    }
                }
            });


            const formattedWorkers = workers.map((worker) => ({
                id: worker.id,
                name: worker.name,
                function: worker.function.name,
            }));

            res.status(200).json(formattedWorkers);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar trabalhadores" });
        }
    }


    async getWorker(req: Request, res: Response) {

        const { id } = req.params;

        const worker = await db.workers.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                function: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }

        const formattedWorker = {
            id: worker.id,
            name: worker.name,
            function: worker.function.name,
        };

        res.status(200).json(formattedWorker);
    }
}