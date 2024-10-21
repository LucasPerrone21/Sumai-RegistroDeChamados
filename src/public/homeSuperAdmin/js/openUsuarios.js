import apiURL from "../../globals/js/apiURL.js";
import Loading from "../../globals/js/loading.js";
const url = `${apiURL}/user/`;
const usuariosPagina = document.querySelector("[data-tipo=usuarios]");
console.log(usuariosPagina);

export default async function openUsuarios() {
    const load = new Loading();    
    load.show();
    await getUsuarios();
    load.hide();
    
    
    async function getUsuarios() {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            const listaUsuarios = usuariosPagina.querySelector(".listaContainer");
            console.log(listaUsuarios);
            listaUsuarios.innerHTML = "";
            data.forEach( usuario => {
                const usuarioLi = document.createElement("li");
                const template = `
                <div class="listaInfo">
                    <p>${usuario.name}</p>
                    <p>${usuario.email}</p>
                </div>
                <img src="/globals/imagens/icones/editar-usuario.png" alt="">
                `
            usuarioLi.innerHTML = template;
            listaUsuarios.appendChild(usuarioLi);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
}