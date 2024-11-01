import { Request, Response } from "express";
import db from "../database/db";

export default class CampusController {
    async register(req: Request, res: Response) {
        const {name, address} = req.body;
        if (!name || !address) {
            return res.status(400).json({message: "Dados inválidos"});
        }
        try{
            await db.campus.create({data: {name, address}});
            return res.status(201).json({message: "Campus criado com sucesso"});
        } catch (error) {
            return res.status(400).json({message: "Não foi possível criar o campus"});
        }
    }
    async list(req: Request, res: Response) {
        try {
            const campus = await db.campus.findMany();
            
            return res.status(200).json(campus);
        }catch (error) {
            return res.status(400).json({message: "Não foi possível listar os campus"});
        }
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;
        const formattedId = parseInt(id);
        try {
            const campus = await db.campus.findUnique({where: {id: formattedId}});
            return res.status(200).json(campus);
        } catch (error) {
            return res.status(400).json({message: "Não foi possível listar o campus"});
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, address } = req.body;
        const formattedId = parseInt(id);
        try {
            await db.campus.update({where: {id: formattedId}, data: {name, address}});
            return res.status(200).json({message: "Campus atualizado com sucesso"});
        } catch (error) {
            return res.status(400).json({message: "Não foi possível atualizar o campus"});
        }
    }
}