import { Router } from "express";
import UserController from "../controller/userController";

const userRoute = Router();
const userController = new UserController();

userRoute.post("/register", userController.register);

export default userRoute;
