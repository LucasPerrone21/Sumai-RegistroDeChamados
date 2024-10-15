import { Router } from "express";
import { WorksController } from "../controller/worksController";
import checkAuth from "../midlewares/checkAuth";

const worksRoute = Router();
const worksController = new WorksController();

worksRoute.post("/",checkAuth , worksController.registerWork);
worksRoute.get("/:campus_id/:date", checkAuth, worksController.getWorksInCampusByDate);
worksRoute.get("/:id", checkAuth, worksController.getWorkById);
worksRoute.put("/:id/status", checkAuth, worksController.updateWorkStatus);
worksRoute.put("/:id", checkAuth, worksController.updateWork);


export default worksRoute;