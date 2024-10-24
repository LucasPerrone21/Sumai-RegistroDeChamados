import apiURL from "../../globals/js/apiURL.js";
import validateInputsUnidade from "./validarInputsUnidade.js";

const url = `${apiURL}/unit/`;
const unidadesPagina = document.querySelector("section[data-tipo=unidades]");


export default async function openUnidades() {
    let btnAdicionar = unidadesPagina.querySelector(".btn-add");

    const newBtn = btnAdicionar.cloneNode(true);
    btnAdicionar.parentNode.replaceChild(newBtn, btnAdicionar);
    btnAdicionar = unidadesPagina.querySelector(".btn-add");
    btnAdicionar.addEventListener("click", abrirModalCadastro);

    let select = unidadesPagina.querySelector("select");

    const newSelect = select.cloneNode(true);
    select.parentNode.replaceChild(newSelect, select);
    select = unidadesPagina.querySelector("select");

    select.addEventListener("change", filter);



    await getUnidades();
    injetarModal();

    async function getUnidades() {
        try {
            const response = await fetch(url + "campus/0/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            const listaUnidades = unidadesPagina.querySelector(".listaContainer");
            listaUnidades.innerHTML = "";
            data.forEach( unidade => {
                const unidadeLi = document.createElement("li");
                const template = `
                <div class="listaInfo">
                    <p>${unidade.name}</p>
                    <p data-codSipac>Código SIPAC: ${unidade.cod_sipac}</p>
                </div>
                <img src="/globals/imagens/icones/mapa.png" alt="">
                `
            unidadeLi.innerHTML = template;
            unidadeLi.dataset.id = unidade.id;
            listaUnidades.appendChild(unidadeLi);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function filter() {
        const value = select.value;
        try {
            const response = await fetch(url + `campus/${value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            const listaUnidades = unidadesPagina.querySelector(".listaContainer");
            listaUnidades.innerHTML = "";
            data.forEach( unidade => {
                const unidadeLi = document.createElement("li");
                const template = `
                <div class="listaInfo">
                    <p>${unidade.name}</p>
                    <p data-codSipac>Código SIPAC: ${unidade.cod_sipac}</p>
                </div>
                <img src="/globals/imagens/icones/mapa.png" alt="">
                `
            unidadeLi.innerHTML = template;
            unidadeLi.dataset.id = unidade.id;
            listaUnidades.appendChild(unidadeLi);
            });
            injetarModal();

        } catch (error) {
            console.error("Error:", pegarDadosParaModal);
        }
    }

    async function injetarModal() {
        const unidadeClick = unidadesPagina.querySelectorAll(".listaContainer img");
        unidadeClick.forEach( unidade => {
            unidade.addEventListener("click", pegarDadosParaModal);
        })

        async function pegarDadosParaModal(event){
            const id = event.target.closest("li").dataset.id;
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }

            try{
                const unidade = await (await fetch(`${url}${id}`, options)).json();
                abrirModalEditar(unidade)
            }
            catch(error){
                console.error("Error:", error)
            }
        }
    }

    async function abrirModalEditar(unidade){
        const modal = document.querySelector("[data-modal='editarUnidade']");
        const nome = modal.querySelector("input[name='name']");
        const codSipac = modal.querySelector("input[name='codSipac']");
        const latitude = modal.querySelector("input[name='latitude']");
        const longitude = modal.querySelector("input[name='longitude']");
        const mapa = modal.querySelector("iframe")

        nome.value = unidade.name;
        codSipac.value = unidade.cod_sipac;
        latitude.value = unidade.latitude;
        longitude.value = unidade.longitude;


        

        mapa.src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1175.3286692004099!2d${unidade.longitude}!3d${unidade.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1spt-BR!2sbr!4v1729790825816!5m2!1spt-BR!2sbr`
        modal.classList.add("ativo");


        const fechar = modal.querySelector(".fechar");
        fechar.addEventListener("click", fecharModal);

        const salvar = modal.querySelector(".confirmar");
        salvar.addEventListener("click", salvarUnidade);
        
        function fecharModal(event){
            event.preventDefault();
            modal.classList.remove("ativo");
            fechar.removeEventListener("click", fecharModal);
            salvar.removeEventListener("click", salvarUnidade);
        }

        async function salvarUnidade(event){
            event.preventDefault();
            const dados = {
                name: nome.value,
                cod_sipac: parseFloat(codSipac.value),
                latitude: parseFloat(latitude.value),
                longitude: parseFloat(longitude.value),
            }
            if(!validateInputsUnidade(dados)){
                alert("Preencha todos os campos corretamente");
                return
            }
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                // CRIAR UM VALIDADOR DE CAMPOS -----------------------------------------------------------------
                body: JSON.stringify(dados),
            }
            try{
                const response = await fetch(`${url}${unidade.id}`, options);
                if(response.ok){
                    alert("Campus editado com sucesso");
                    window.location.reload()
                }
                else{
                    alert("Erro ao editar o Campus");

                }
            }
            catch(error){
                console.error("Error:", error)
            }
        }
    }




// COMEÇAR AQUI -----------------------------------------------------------------------------------------------



    async function abrirModalCadastro() {
        const modal = document.querySelector("[data-modal='cadastrarCampus']");
        const nome = modal.querySelector("input[name='name']");
        const endereco = modal.querySelector("textarea[name='address']");

        modal.classList.add("ativo");


        const fechar = modal.querySelector(".fechar");
        const salvar = modal.querySelector(".confirmar");

        fechar.addEventListener("click", fecharModal);
        salvar.addEventListener("click", cadastrarCampus);

        modal.classList.add("ativo");


        async function cadastrarCampus(event) {
            event.preventDefault();

            const dados = {
                name: nome.value,
                address: endereco.value,
            }

            if(!validateInputsCampus(dados)){
                alert("Preencha todos os campos corretamente");
                return;
            }

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(dados),
            };

            try{
                const response = await fetch(url, options);
                if(response.ok){
                    alert("Usuário cadastrado com sucesso");
                    window.location.reload();
                }
                else{
                    alert("Erro ao cadastrar usuário");
                }
            }
            catch(error){
                console.error("Error:", error);
            }

            
        }

        function fecharModal(event) {
            event.preventDefault();
            modal.classList.remove("ativo");
            fechar.removeEventListener("click", fecharModal);
            salvar.removeEventListener("click", cadastrarCampus);
        }

    }

    
}