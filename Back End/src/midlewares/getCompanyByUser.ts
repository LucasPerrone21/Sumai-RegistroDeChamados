import db from "../database/db";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default async function getCompanyByUser(req: Request){
    const token = req.cookies.token as string;
    const decodedToken = jwt.decode(token as string) as { email: string, permissions: string[], company: number };
    return decodedToken.company;
}