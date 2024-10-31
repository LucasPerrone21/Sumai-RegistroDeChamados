import CompanyController from "../controller/companyController";
import checkAuth from "../midlewares/checkAuth";
import checkRoles from "../midlewares/permissions";
import { Router } from "express";

const companyRoute = Router();

const companyController = new CompanyController();

companyRoute.post("/",checkAuth, checkRoles(['SUPERADMIN']), companyController.register);
companyRoute.get("/",checkAuth, companyController.list);
companyRoute.get("/:id",checkAuth, checkRoles(['SUPERADMIN']), companyController.show);
companyRoute.put("/:id",checkAuth, checkRoles(['SUPERADMIN']), companyController.update);

export default companyRoute;