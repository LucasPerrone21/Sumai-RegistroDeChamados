import { Response, Request } from "express";
import db from "../database/db";
import getCompanyByUser from "../midlewares/getCompanyByUser";
import getUserByToken from "../midlewares/getUserByToken";

export class WorksController {
    async registerWork(req: Request, res: Response) {
        const { unit, date, place, workers} = req.body;
        const company = await getCompanyByUser(req);

        if(!unit || !date || !place || !workers){
            return res.status(400).json({ message: 'Preencha todos os campos' });
        }



        try {
            const user = await getUserByToken(req); 
            const user_id = user?.id;

            if(!user_id){
                return res.status(401).json({ message: 'Usuário não autorizado' });
            }

            const dateWithTimestamp = new Date(date);
            const dateWithoutTimestamp = dateWithTimestamp.toISOString()
            const newWork = await db.works.create({
                data:{
                    unit:{
                        connect: { id: unit }
                    },
                    user_id: {
                        connect: { id: user_id }
                    },
                    company: {
                        connect: { id: company }
                    },
                    date: dateWithoutTimestamp,
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
    
    async getWorksInCampusByDate(req: Request, res: Response) {
        const company = await getCompanyByUser(req)
        const campus_id = parseInt(req.params.campus_id);
        const date = req.params.date as string;
        
        let formatedDate

        if(date){
            formatedDate = new Date(date).toISOString();
        }
        else{
            formatedDate = new Date().toISOString();
        }

        const startOfDay = new Date(formatedDate);
        startOfDay.setHours(0,0,0,1);
        const endOfDay = new Date(formatedDate);
        endOfDay.setHours(23,59,59,999);

        if(!company){
            return res.status(401).json({ message: 'Usuário não autorizado' });
        }

        const works = await db.works.findMany({
            where:{
                company: {
                    id: company
                },
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                unit:{
                    id_campus: campus_id
                }
            },
            select:{
                id: true,
                date: true,
                place: true,
                status: true,
                unit: {
                    select: {
                        name: true,
                        campus: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                WorksWorkers: {
                    select: {
                        worker: {
                            select: {
                                name: true,
                                function: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const formattedWorks = works.map((work) => ({
            id: work.id,
            date: work.date,
            place: work.place,
            unit: work.unit.name,
            campus: work.unit.campus.name,
            status: work.status,
            workers: work.WorksWorkers.map((worker) => ({
                name: worker.worker.name,
                function: worker.worker.function.name
            }))
        }));
        

        if(formattedWorks.length === 0){
            return res.status(404).json({ message: 'Nenhum chamado encontrado' });
        }
        return res.status(200).json(formattedWorks);
    }

    async getWorkById(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try{
            const work = await db.works.findFirst({
                select: {
                    id: true,
                    date: true,
                    place: true,
                    status: true,
                    unit: {
                        select: {
                            name: true,
                            campus: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    WorksWorkers: {
                        select: {
                            worker: {
                                select: {
                                    name: true,
                                    function: {
                                        select: {
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                where: {
                    id
                }
            })

            if(!work){
                return res.status(404).json({ message: 'Chamado não encontrado' });
            }

            const formattedWork = {
                id: work.id,
                date: work.date,
                place: work.place,
                unit: work.unit.name,
                campus: work.unit.campus.name,
                status: work.status,
                workers: work.WorksWorkers.map((worker) => ({
                    name: worker.worker.name,
                    function: worker.worker.function.name
                }))
            }

            return res.status(200).json(formattedWork);
        }
        catch(error){
            return res.status(500).json({ message: 'Erro ao buscar chamado' });
        }
    }

    async getEveryWorkByDate(req: Request, res: Response) {
        const company = await getCompanyByUser(req);
        console.log(company);
        const date = req.params.date as string;
        let formatedDate
        if(date){
            formatedDate = new Date(date).toISOString();
        }
        else{
            formatedDate = new Date().toISOString();
        }
        const startOfDay = new Date(formatedDate);
        startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date(formatedDate);
        endOfDay.setHours(23,59,59,999);
        if(!company){
            return res.status(401).json({ message: 'Usuário não autorizado' });
        }
        const works = await db.works.findMany({
            where:{
                company: {
                    id: company
                },
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                }
            },
            select:{
                id: true,
                date: true,
                place: true,
                status: true,
                unit: {
                    select: {
                        name: true,
                        campus: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                WorksWorkers: {
                    select: {
                        worker: {
                            select: {
                                name: true,
                                function: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
       /*  const formattedWorks = works.map((work) => ({
            id: work.id,
            date: work.date,
            place: work.place,
            unit: work.unit.name,
            campus: work.unit.campus.name,
            status: work.status,
            workers: work.WorksWorkers.map((worker) => ({
                name: worker.worker.name,
                function: worker.worker.function.name
            }))
        })); */

        if(works.length === 0){
            return res.status(404).json({ message: 'Nenhum chamado encontrado' });
        }

        return res.status(200).json(works);
    }
}