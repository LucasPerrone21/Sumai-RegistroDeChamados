import burguerMenu from "../../globals/js/burguerMenu.js";
import checkToken from "../../globals/js/checkToken.js";
import logout from "../../globals/js/logout.js";
import saudacao from './saudacao.js'
import loading from "../../globals/js/loading.js";
import Loading from "../../globals/js/loading.js";

const load = new Loading();

load.show()

await checkToken();
await logout();
await burguerMenu();
await saudacao()

load.hide()

