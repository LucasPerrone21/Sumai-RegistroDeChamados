import apiURL from "../../globals/js/apiURL.js";


const url = `${apiURL}/campus/`;
const campusPagina = document.querySelector("section[data-tipo=campus]");


export default async function openCampus() {
    let btnAdicionar = campusPagina.querySelector(".btn-add");

    const newBtn = btnAdicionar.cloneNode(true);
    btnAdicionar.parentNode.replaceChild(newBtn, btnAdicionar);

    btnAdicionar = campusPagina.querySelector(".btn-add");


    btnAdicionar.addEventListener("click", abrirModalCadastro);

    await getCampus();
    injetarModal();

    async function getCampus() {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            const listaCampus = campusPagina.querySelector(".listaContainer");
            listaCampus.innerHTML = "";
            data.forEach( campus => {
                const campusLi = document.createElement("li");
                const template = `
                <div class="listaInfo">
                    <p>${campus.name}</p>
                    <p data-endereco>${campus.address}</p>
                </div>
                <img src="/globals/imagens/icones/mapa.png" alt="">
                `
            campusLi.innerHTML = template;
            campusLi.dataset.id = campus.id;
            listaCampus.appendChild(campusLi);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async function injetarModal() {
        const campusClick = campusPagina.querySelectorAll(".listaContainer img");
        campusClick.forEach( campus => {
            campus.addEventListener("click", pegarDadosParaModal);
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
                const campus = await (await fetch(`${url}${id}`, options)).json();
                abrirModalEditar(campus)
            }
            catch(error){
                console.error("Error:", error)
            }
        }
    }

    async function abrirModalEditar(campus){
        const modal = document.querySelector("[data-modal='editarCampus']");
        const nome = modal.querySelector("input[name='name']");
        const endereco = modal.querySelector("textarea[name='address']");

        nome.value = campus.name;
        endereco.value = campus.address;

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
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                // CRIAR UM VALIDADOR DE CAMPOS -----------------------------------------------------------------
                body: JSON.stringify({
                    name: nome.value,
                    address: endereco.value,
                }),
            }
            try{
                const response = await fetch(`${url}${campus.id}`, options);
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