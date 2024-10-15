import { Request, Response } from "express";
import db from "../database/db";
import jwt from 'jsonwebtoken';


export class WorkersController {
    async getWorkers(req: Request, res: Response) {
        const token = req.cookies.token;
        const decodedToken = jwt.decode(token as string) as { email: string, permissions: string[], company: number };

        try {
            let workers;
            if (decodedToken.company === 1){
               workers = await db.workers.findMany({
                select: {
                    id: true,
                    name: true,
                    function: {
                        select: {
                            name: true,
                        },
                    },
                },
               })
            }
            else{
                workers = await db.workers.findMany({
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
                            id: decodedToken.company
                        }
                    }
                });
            }


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