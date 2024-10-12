import apiURL from "../../globals/js/apiURL.js";



export default async function saudacao() {
    const saudacao = document.querySelector("#nome");
    const url = `${apiURL}/user/info`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }

    const user = await(await fetch(url, options)).json();

    saudacao.textContent = user.name;


}