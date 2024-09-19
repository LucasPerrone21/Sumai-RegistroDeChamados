import { Router } from "express";
import { WorksController } from "../controller/worksController";
import checkAuth from "../midlewares/checkAuth";

const worksRoute = Router();
const worksController = new WorksController();

worksRoute.post("/",checkAuth , worksController.registerWork);
worksRoute.get("/", checkAuth, worksController.getWorksByDate);

export default worksRoute;