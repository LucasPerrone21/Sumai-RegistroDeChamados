import ViewsController from "../controller/viewsController";
import { Router } from "express";

const viewRoutes = Router();

const viewsController = new ViewsController();

viewRoutes.get('/', viewsController.login);
viewRoutes.get('/home', viewsController.home);
viewRoutes.get('/editarAtendimento/:id', viewsController.editarAtendimento);

viewRoutes.get('/verAtendimentos' , viewsController.verAtendimentos);
viewRoutes.get('/cadastrarAtendimento' , viewsController.cadastrarAtendimento);

export default viewRoutes;