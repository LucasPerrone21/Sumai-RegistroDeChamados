import burguerMenu from "../../globals/js/burguerMenu.js";
import checkToken from "../../globals/js/checkToken.js";
import abrirBusca from "./abrirBusca.js";
import enviarChamado from "./enviarChamado.js";
import verUnidades from "./verUnidades.js";
import getInfo from "./getInfo.js";
import logout from "../../globals/js/logout.js";

checkToken();
logout();
burguerMenu();
abrirBusca();
enviarChamado();
verUnidades();
getInfo()
/* verUnidades(); */