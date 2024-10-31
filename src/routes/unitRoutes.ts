import { Router } from "express";
import UnitController from "../controller/unitController";
import checkAuth from "../midlewares/checkAuth";
import checkRoles from "../midlewares/permissions";

const unitRoutes = Router();
const unitController = new UnitController();

unitRoutes.get("/:id",checkAuth, unitController.getById);
unitRoutes.get("/campus/:id",checkAuth, unitController.listByCampus);
unitRoutes.post("/",checkAuth, checkRoles(['SUPERADMIN']), unitController.register);
unitRoutes.put("/:id",checkAuth, checkRoles(['SUPERADMIN']), unitController.update);

export default unitRoutes;