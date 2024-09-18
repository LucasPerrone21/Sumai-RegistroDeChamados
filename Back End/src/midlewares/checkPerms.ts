import { Request, Response, NextFunction } from 'express';

function checkAccessWorks(req: Request, res: Response, next: Function) {
    const userPermission = req.cookies.permissions;
    if (!userPermission) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    if (userPermission !== 'SUPERADMIN' || userPermission !== 'TECHNICAL_MANAGER') {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    
    next();
}

function checkSpAdmin(req: Request, res: Response, next: Function) {
    const userPermission = req.cookies.permissions;
    if (!userPermission) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    if (userPermission !== 'SUPERADMIN') {
        return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    
    next();
}


export { checkAccessWorks, checkSpAdmin };