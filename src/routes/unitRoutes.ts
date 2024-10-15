import { Router } from "express";
import UnitController from "../controller/unitController";
import checkAuth from "../midlewares/checkAuth";

const unitRoutes = Router();
const unitController = new UnitController();

unitRoutes.post("/register",checkAuth, unitController.register);
unitRoutes.get("/:id",checkAuth, unitController.listByCampus);

export default unitRoutes;