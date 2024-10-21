import { Router } from "express";
import UserController from "../controller/userController";

const userRoute = Router();
const userController = new UserController();

userRoute.post("/", userController.register);
userRoute.get("/info", userController.getUserInfo);
userRoute.get("/", userController.getAllUsers);
userRoute.get("/:id", userController.getUserById);

export default userRoute;
