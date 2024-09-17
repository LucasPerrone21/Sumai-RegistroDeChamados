import { Request, Response } from "express";
import db from "../database/db";

export default class CampusController {
    async register(req: Request, res: Response) {
        const {name, address} = req.body;
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
}