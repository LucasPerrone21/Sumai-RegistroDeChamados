import apiURL from "../../globals/js/apiURL.js";
import validateInputsTercerizada from "./validarInputsTercerizada.js";

const url = `${apiURL}/company/`;
const unidadesPagina = document.querySelector("section[data-tipo=empresas]");


export default async function openTercerizadas() {
    let btnAdicionar = unidadesPagina.querySelector(".btn-add");

    const newBtn = btnAdicionar.cloneNode(true);
    btnAdicionar.parentNode.replaceChild(newBtn, btnAdicionar);
    btnAdicionar = unidadesPagina.querySelector(".btn-add");
    btnAdicionar.addEventListener("click", abrirModalCadastro);




    await getEmpresas();
    injetarModal();

    async function getEmpresas() {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            const listaEmpresas = unidadesPagina.querySelector(".listaContainer");
            listaEmpresas.innerHTML = "";
            data.forEach( empresa => {
                const empresaLi = document.createElement("li");
                const template = `
                <div class="listaInfo">
                    <p>${empresa.name}</p>
                    <p>E-mail: ${empresa.email}</p>
                </div>
                <img src="/globals/imagens/icones/mapa.png" alt="">
                `
            empresaLi.innerHTML = template;
            empresaLi.dataset.id = empresa.id;
            listaEmpresas.appendChild(empresaLi);
            });
        } catch (error) {
            console.error("Error:", error);
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

    async function abrirModalEditar(empresa){
        console.log(empresa)
        const modal = document.querySelector("[data-modal='editarEmpresa']");
        const nome = modal.querySelector("input[name='name']");
        const email = modal.querySelector("input[name='email']");
        const cnpj = modal.querySelector("input[name='cnpj']");
        const tel = modal.querySelector("input[name='telefone']");

        nome.value = empresa.name;
        email.value = empresa.email;
        cnpj.value = empresa.cnpj;
        tel.value = empresa.tel;

        modal.classList.add("ativo");


        const fechar = modal.querySelector(".fechar");
        fechar.addEventListener("click", fecharModal);

        const salvar = modal.querySelector(".confirmar");
        salvar.addEventListener("click", salvarTercerizada);
        
        function fecharModal(event){
            event.preventDefault();
            modal.classList.remove("ativo");
            fechar.removeEventListener("click", fecharModal);
            salvar.removeEventListener("click", salvarTercerizada);
        }

        async function salvarTercerizada(event){
            event.preventDefault();
            const dados = {
                name: nome.value,
                email: email.value,
                cnpj: cnpj.value,
                tel: tel.value,
            }
            if(!validateInputsTercerizada(dados)){
                alert("Preencha todos os campos corretamente");
                return
            }
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(dados),
            }
            try{
                const response = await fetch(`${url}${empresa.id}`, options);
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








    async function abrirModalCadastro() {
        const modal = document.querySelector("[data-modal='cadastrarEmpresa']");
        const nome = modal.querySelector("input[name='name']");
        const email = modal.querySelector("input[name='email']");
        const cnpj = modal.querySelector("input[name='cnpj']");
        const tel = modal.querySelector("input[name='telefone']");


        modal.classList.add("ativo");


        const fechar = modal.querySelector(".fechar");
        const salvar = modal.querySelector(".confirmar");

        fechar.addEventListener("click", fecharModal);
        salvar.addEventListener("click", cadastrarTercerizada);

        modal.classList.add("ativo");


        async function cadastrarTercerizada(event) {
            event.preventDefault();

            const dados = {
                name: nome.value,
                email: email.value,
                cnpj: cnpj.value,
                tel: tel.value,
            }

            console.log(dados);

            if(!validateInputsTercerizada(dados)){
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
            salvar.removeEventListener("click", cadastrarTercerizada);
        }

    }

    
}