import ViewsController from "../controller/viewsController";
import { Router } from "express";
import checkAuth from "../midlewares/checkAuth";
import checkRoles from "../midlewares/permissions";

const viewRoutes = Router();

const viewsController = new ViewsController();

viewRoutes.get('/', viewsController.login);
viewRoutes.get('/home', checkAuth, viewsController.home);

viewRoutes.get('/editarAtendimento/:id', checkAuth, checkRoles(['TECHNICAL_ADMIN']), viewsController.editarAtendimento);

viewRoutes.get('/verAtendimentos', checkAuth, checkRoles(['TECHNICAL_MANAGER']) , viewsController.verAtendimentos);
viewRoutes.get('/cadastrarAtendimento', checkAuth, checkRoles(['TECHNICAL_MANAGER']) , viewsController.cadastrarAtendimento);

export default viewRoutes;