import CampusController from "../controller/campusController";
import checkAuth from "../midlewares/checkAuth";
import { checkSpAdmin } from "../midlewares/checkPerms";
import { Router } from "express";

const campusRoutes = Router();

const campusController = new CampusController();

campusRoutes.post("/", checkAuth , checkSpAdmin , campusController.register);
campusRoutes.get("/", checkAuth , campusController.list);

export default campusRoutes;