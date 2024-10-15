import CampusController from "../controller/campusController";
import checkAuth from "../midlewares/checkAuth";
import checkRoles from "../midlewares/permissions";
import { Router } from "express";

const campusRoutes = Router();

const campusController = new CampusController();

campusRoutes.post("/", checkAuth , checkRoles(["SUPERADMIN",]) , campusController.register);
campusRoutes.get("/", checkAuth , campusController.list);

export default campusRoutes;