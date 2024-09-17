import { Response, Request } from "express";
import db from "../database/db";

export class WorksController {
    async registerWork(req: Request, res: Response) {
        try {
            const { unit, date, place, workers} = req.body;
            const newWork = await db.works.create({
                data:{
                    unit:{
                        connect: { id: unit }
                    },
                    company: {
                        connect: { id: 1 }
                    },
                    date: new Date(date),
                    place,
                    WorksWorkers:{
                        createMany:{
                            data: workers.map((worker: any) => ({ id_worker: worker }))
                        }
                    }
                }
            });
            res.status(201).json(newWork);
        } catch (error) {
            console.log(error);
        }
    }
}