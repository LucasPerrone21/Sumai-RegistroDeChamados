import { Router } from "express";
import UserController from "../controller/userController";
import checkRoles from "../midlewares/permissions";
import checkAuth from "../midlewares/checkAuth";

const userRoute = Router();
const userController = new UserController();

userRoute.post("/", checkAuth, checkRoles(['SUPERADMIN']) , userController.register);
userRoute.get("/info", checkAuth, userController.getUserInfo);
userRoute.get("/", checkAuth, checkRoles(['SUPERADMIN']), userController.getAllUsers);
userRoute.get("/:id", checkAuth, checkRoles(['SUPERADMIN']),userController.getUserById);
userRoute.put("/:id", checkAuth, checkRoles(['SUPERADMIN']), userController.updateUser);

export default userRoute;
