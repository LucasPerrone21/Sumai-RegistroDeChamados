import { Router } from "express";
import UnitController from "../controller/unitController";
import checkAuth from "../midlewares/checkAuth";

const unitRoutes = Router();
const unitController = new UnitController();

unitRoutes.get("/:id",checkAuth, unitController.getById);
unitRoutes.get("/campus/:id",checkAuth, unitController.listByCampus);
unitRoutes.post("/",checkAuth, unitController.register);
unitRoutes.put("/:id",checkAuth, unitController.update);

export default unitRoutes;