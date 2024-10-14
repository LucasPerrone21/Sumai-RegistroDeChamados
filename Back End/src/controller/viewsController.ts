import jwt from 'jsonwebtoken';
import db from '../database/db';
import { date } from 'zod';

export default class ViewsController{
    async login(req: any, res: any){
        res.render('login', {layout: false});
    }
    async home(req: any, res: any){
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/');
        }
        const decodedToken = jwt.decode(token as string) as { email: string, permissions: string[] };
        const permissions = await db.access.findMany({
            where:{
                id: {
                    in: decodedToken.permissions
                },
            },
            select: {
                role: true
            }
        })

        if(permissions.length === 0){
            return res.redirect('/');
        }

        if(permissions.some(p => p.role === 'SUPERADMIN' || p.role === 'TECHNICAL_ADMIN')){
            return res.render('homeAdmin', {layout: false});
        }else if(permissions.some(p => p.role === 'TECHNICAL_MANAGER')){
            return res.render('homeEncarregados', {layout: false});
        }
    }
    async editarAtendimento(req: any, res: any){
        const id = Number(req.params.id);

        try{
            const work = await db.works.findUnique({
                where:{
                    id: id
                },
                select:{
                    id: true,
                    status: true,
                    aprovedBy: true,
                    date: true,
                    place: true,
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
                    WorksWorkers:{
                        select:{
                            worker:{
                                select:{
                                    id: true,
                                    name: true,
                                    function: {
                                        select:{
                                            name: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })

            if(!work){
                return res.redirect('/home');
            }

            const formattedDate = new Date(work.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
            const formattedWork = {
                id: work.id,
                status: work.status,
                aprovedBy: work.aprovedBy,
                date: formattedDate,
                place: work.place,
                unit: work.unit.name,
                campus: work.unit.campus.name,
                workers: work.WorksWorkers.map((w: any) => {
                    return {
                        id: w.worker.id,
                        name: w.worker.name,
                        function: w.worker.function.name
                    }
                })
            }

            console.log(formattedWork);

            res.render('editarAtendimento', {layout: false, work});
        }
        catch(err){
            console.log(err);
            res.redirect('/home');
        }
    } 

    async cadastrarAtendimento(req: any, res: any){
        res.render('cadastrarAtendimento', {layout: false});
    }

    async verAtendimentos(req: any, res: any){
        res.render('verAtendimentos', {layout: false});
    }
}