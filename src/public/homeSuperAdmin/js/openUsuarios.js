import apiURL from "../../globals/js/apiURL.js";
import validateInputsUsuario from "./validarInputsUsuarios.js";


const url = `${apiURL}/user/`;
const usuariosPagina = document.querySelector("section[data-tipo=usuarios]");
const itens = [];

export default async function openUsuarios() {
    let btnAdicionar = usuariosPagina.querySelector(".btn-add");

    const newBtn = btnAdicionar.cloneNode(true);
    btnAdicionar.parentNode.replaceChild(newBtn, btnAdicionar);

    btnAdicionar = usuariosPagina.querySelector(".btn-add");


    btnAdicionar.addEventListener("click", abrirModalCadastro);

    await getUsuarios();
    buscarUsuarios();
    injetarModal();

    
    async function buscarUsuarios() {
        const input = usuariosPagina.querySelector("input");
        const buscaResultados = usuariosPagina.querySelector('.listaContainer');
        
        input.addEventListener("input", buscarPessoas)
    
        function buscarPessoas(event){
            const valor = event.target.value.toUpperCase();
            buscaResultados.innerHTML = ""
            itens.forEach(item => {
                const email = item.querySelector("[data-email]").textContent.toUpperCase();
                if(email.includes(valor)){
                    buscaResultados.appendChild(item)
                }
            })
                
        }
    }

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
            listaUsuarios.innerHTML = "";
            data.forEach( usuario => {
                const usuarioLi = document.createElement("li");
                const template = `
                <div class="listaInfo">
                    <p>${usuario.name}</p>
                    <p data-email>${usuario.email}</p>
                </div>
                <img src="/globals/imagens/icones/editar-usuario.png" alt="">
                `
            usuarioLi.innerHTML = template;
            usuarioLi.dataset.id = usuario.id;
            listaUsuarios.appendChild(usuarioLi);

            itens.push(usuarioLi);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function injetarModal() {
        const usuariosClick = usuariosPagina.querySelectorAll(".listaContainer img");
        usuariosClick.forEach( usuario => {
            usuario.addEventListener("click", pegarDadosParaModal);
        })

        async function pegarDadosParaModal(event){
            const id = event.target.closest("li").dataset.id;
            const options ={
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }

            try{
                const usuario = await (await fetch(`${url}${id}`, options)).json();
                abrirModalEditar(usuario)
            }
            catch(error){
                console.error("Error:", error)
            }
        }
    }

    async function abrirModalEditar(usuario){
        const modal = document.querySelector("[data-modal='editarUsuario']");
        const nome = modal.querySelector("input[name='name']");
        const email = modal.querySelector("input[name='email']");
        const empresa = modal.querySelector("select[name='empresa']");
        const senha = modal.querySelector("input[type='password']");
        const permissao = modal.querySelectorAll("input[name='permissao']");


        nome.value = usuario.name;
        email.value = usuario.email;
        empresa.value = usuario.company.id;
        
        
        permissao.forEach( permissao => {
            if(permissao.value === usuario.role){
                permissao.checked = true;
                console.log(permissao)
            }
        })

        modal.classList.add("ativo");


        const fechar = modal.querySelector(".fechar");
        fechar.addEventListener("click", fecharModal);

        const salvar = modal.querySelector(".confirmar");
        salvar.addEventListener("click", salvarUsuario);
        
        function fecharModal(event){
            event.preventDefault();
            modal.classList.remove("ativo");
            fechar.removeEventListener("click", fecharModal);
            salvar.removeEventListener("click", salvarUsuario);
        }

        async function salvarUsuario(event){
            event.preventDefault();

            let role

            for( let permissaoItem of permissao){
                if(permissaoItem.checked){
                    role = permissaoItem.value;
                }
            }

            const dados = {
                name: nome.value,
                email: email.value,
                company: empresa.value,
                role: role,
                password: senha.value,
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
                const response = await fetch(`${url}${usuario.id}`, options);
                if(response.ok){
                    alert("Usuário editado com sucesso");
                    window.location.reload()
                }
                else{
                    alert("Erro ao editar usuário");

                }
            }
            catch(error){
                console.error("Error:", error)
            }
        }
    }

    async function abrirModalCadastro() {
        const modal = document.querySelector("[data-modal='cadastrarUsuario']");
        const nome = modal.querySelector("input[name='name']");
        const email = modal.querySelector("input[name='email']");
        const senha = modal.querySelector("input[type='password']");
        const empresa = modal.querySelector("select[name='empresa']");
        const permissoes = modal.querySelectorAll("input[name='permissao']");


        const fechar = modal.querySelector(".fechar");
        const salvar = modal.querySelector(".confirmar");

        fechar.addEventListener("click", fecharModal);
        salvar.addEventListener("click", salvarUsuario);

        modal.classList.add("ativo");


        async function salvarUsuario(event) {
            event.preventDefault();

            let permissaoFinal

            permissoes.forEach( permissao => {
                if(permissao.checked){
                    permissaoFinal = permissao.value;
                }
            })

            const dados = {
                name: nome.value,
                email: email.value,
                password: senha.value,
                company: empresa.value,
                role: permissaoFinal,
            }

            if(!validateInputsUsuario(dados)){
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
            salvar.removeEventListener("click", salvarUsuario);
        }

    }

    
}