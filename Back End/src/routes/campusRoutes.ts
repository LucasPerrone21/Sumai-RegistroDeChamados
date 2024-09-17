import CampusController from "../controller/campusController";
import checkAuth from "../midlewares/checkAuth";
import { Router } from "express";

const campusRoutes = Router();

const campusController = new CampusController();

campusRoutes.post("/register", checkAuth , campusController.register);
campusRoutes.get("/list", checkAuth ,campusController.list);

export default campusRoutes;