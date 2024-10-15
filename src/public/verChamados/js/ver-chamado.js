import burguerMenu from "../../globals/js/burguerMenu.js";
import checkToken from "../../globals/js/checkToken.js";
import logout from "../../globals/js/logout.js";
import autodate from "./autodate.js";
import pegarChamados from "./pegarChamados.js";
import getCampus from "./getCampus.js";

await checkToken();
await getCampus();
logout();
burguerMenu();
autodate();
pegarChamados();