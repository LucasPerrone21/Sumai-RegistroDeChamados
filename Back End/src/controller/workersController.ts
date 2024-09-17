import e, { Request, Response } from "express";
import db from "../database/db";
import jwt from "jsonwebtoken";
import { date } from "zod";

export class WorkersController {
    async getWorkers(req: Request, res: Response) {
        // MELHORE A LÓGICA AQUI

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
        });


        const formattedWorkers = workers.map((worker) => ({
            id: worker.id,
            name: worker.name,
            function: worker.function.name,
        }));

        res.status(200).json(formattedWorkers);
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