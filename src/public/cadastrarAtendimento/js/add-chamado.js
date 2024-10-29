import burguerMenu from "../../globals/js/burguerMenu.js";
import checkToken from "../../globals/js/checkToken.js";
import abrirBusca from "./abrirBusca.js";
import enviarChamado from "./enviarChamado.js";
import verUnidades from "./verUnidades.js";
import logout from "../../globals/js/logout.js";
import Loading from "../../globals/js/loading.js";

const load = new Loading();


load.show()
await checkToken();
await logout();
burguerMenu();
await abrirBusca();
enviarChamado();
await verUnidades();
load.hide()
/* verUnidades(); */