import { Router } from "express";
import AuthController from "../controller/authControllers/worksAuth";

const authRoute = Router();
const authController = new AuthController();

authRoute.post("/login", authController.login);
authRoute.get("/logout", authController.logout);
authRoute.get("/checkAuth", authController.checkAuth);

export default authRoute;