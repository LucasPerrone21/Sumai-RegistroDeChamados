import { Request, Response } from "express";
import db from "../database/db";

export default class UnitController {
    async register(req: Request, res: Response) {
        const {name, id_campus, latitude, longitude, cod_sipac } = req.body;
        if (!name || !id_campus || !latitude || !longitude || !cod_sipac) {
            return res.status(400).json({message: "Preencha todos os campos"});
        }
        try{
            await db.unit.create({data: {name, latitude, longitude , id_campus, cod_sipac}});
            return res.status(201).json({message: "Unidade criada com sucesso"});
        } catch (error) {
            return res.status(400).json({message: "Não foi possível criar a unidade"});
        }
    }

    async listByCampus(req: Request, res: Response) {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({message: "Informe o id do campus"});
        }
        const idConvertido = parseInt(id);
        if(isNaN(idConvertido)) {
            return res.status(400).json({message: "Informe um id válido"});
        }

        try {
            let units;
            
            if(idConvertido === 0) {
                units = await db.unit.findMany();
            } else {
                units = await db.unit.findMany({where: {id_campus: idConvertido}});
            }
            if(units.length === 0) {
                return res.status(404).json({message: "Nenhuma unidade encontrada"});
            }
            return res.status(200).json(units);
        }catch (error) {
            return res.status(400).json({message: "Não foi possível listar as unidades"});
        }
    }

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({message: "Informe o id da unidade"});
        }
        const idConvertido = parseInt(id);
        if(isNaN(idConvertido)) {
            return res.status(400).json({message: "Informe um id válido"});
        }

        try {
            const unit = await db.unit.findUnique({where: {id: idConvertido}});
            if(!unit) {
                return res.status(404).json({message: "Unidade não encontrada"});
            }
            return res.status(200).json(unit);
        }catch (error) {
            return res.status(400).json({message: "Não foi possível listar a unidade"});
        }
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const {name, latitude, longitude, cod_sipac} = req.body;
        if(!id) {
            return res.status(400).json({message: "Informe o id da unidade"});
        }

        const idConvertido = parseInt(id);

        if(isNaN(idConvertido)) {
            return res.status(400).json({message: "Informe um id válido"});
        }

        if (!name || !latitude || !longitude || !cod_sipac) {
            return res.status(400).json({message: "Preencha todos os campos"});
        }

        try {
            await db.unit.update({where: {id: idConvertido}, data: {name, latitude, longitude, cod_sipac}});
            return res.status(200).json({message: "Unidade atualizada com sucesso"});
        } catch (error) {
            return res.status(400).json({message: "Não foi possível atualizar a unidade"});
        }
    }
}