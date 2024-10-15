import burguerMenu from "../../globals/js/burguerMenu.js";
import checkToken from "../../globals/js/checkToken.js";
import logout from "../../globals/js/logout.js";
import saudacao from "./saudacao.js";
import atendimentosAprovados from "./atendimentosAprovados.js";
import antendidmentosPendentes from "./antendidmentosPendentes.js";

await checkToken();
await saudacao();
await logout();
burguerMenu();
await atendimentosAprovados();
await antendidmentosPendentes();

