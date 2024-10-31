import { WorkersController } from "../controller/workersController";
import checkAuth from "../midlewares/checkAuth";
import { Router } from "express";

const workersRoute = Router();
const workersController = new WorkersController();

workersRoute.get("/", checkAuth, workersController.getWorkers);
workersRoute.get("/:id", checkAuth, workersController.getWorker);

export default workersRoute;