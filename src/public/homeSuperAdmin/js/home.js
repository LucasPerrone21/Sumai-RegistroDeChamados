import burguerMenu from "../../globals/js/burguerMenu.js";
import checkToken from "../../globals/js/checkToken.js";
import logout from "../../globals/js/logout.js";
import mudarAbas from "./mudarAbas.js";


await checkToken();
await logout();
burguerMenu();
mudarAbas()