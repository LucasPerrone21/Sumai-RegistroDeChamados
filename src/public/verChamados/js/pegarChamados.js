import apiURL from "../../globals/js/apiURL.js"
import Loading from "../../globals/js/loading.js"

export default function pegarChamados(){
    const campus = document.querySelector("#campus")
    const data = document.querySelector("#data")
    const button = document.querySelector("#btn-pesquisa")

    button.addEventListener("click", getChamados)

    button.click()
    
    async function getChamados(event){
        const load = new Loading()
        load.show()
        event.preventDefault()
        const url = `${apiURL}/works/${campus.value}/${data.value}`
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        }


        try{
            const data = await (await fetch(url, options)).json()
            mostrarChamados(data)
        }
        catch(error){
            console.log(error)
        }
        load.hide()
    }


    async function mostrarChamados(chamados){
        const lista = document.querySelector(".listaChamados")
        lista.innerHTML = ""
        chamados.forEach( chamado => {
            const li = document.createElement("li")
            li.dataset.id = chamado.id
            li.innerHTML = `
                    <div class="chamados-info">
                        <div>
                            <p>${chamado.place}</p>
                            <span class="status" data-status="${chamado.status}"></span>
                        </div>
                        <p>${chamado.campus} - ${chamado.unit}</p>
                    </div>
                    <img src="./globals/imagens/icones/visao-geral.svg" alt="">`
            
            lista.appendChild(li)

            li.querySelector("img").addEventListener("click", abrirChamadoModal)
        })
    }


    async function abrirChamadoModal(event){
        event.preventDefault()
        const load = new Loading()
        load.show()
        const id = event.target.closest("li").dataset.id
        const chamado = await getChamadoById(id)
        const modal = document.querySelector(".modalContainer")
        modal.classList.add("ativo")
        modal.querySelector("#modal-local").innerText = chamado.place
        modal.querySelector("#modal-campus").innerText = chamado.campus
        modal.querySelector("#modal-unidade").innerText = chamado.unit
        const status = modal.querySelector("#modal-status")

        if(chamado.status === "ACCEPTED"){
            status.innerText = "Aprovado"
            status.dataset.statusModal = "APROVED"
        } else if(chamado.status === "REJECTED"){
            status.innerText = "Rejeitado"
            status.dataset.statusModal = "REJECTED"
        } else {
            status.innerText = "Pendente"
            status.dataset.statusModal = "PENDING"
        }

        const funcionarios = modal.querySelector(".listaFuncionarios")
        funcionarios.innerHTML = ""

        chamado.workers.forEach( worker => {
            const li = document.createElement("li")
            li.innerHTML = `
                    <p>${worker.name}</p>
                    <p>${worker.function}</p>`
            funcionarios.appendChild(li)
        })

        const btnVoltar = modal.querySelector(".btnRevisao")
        btnVoltar.addEventListener("click", fecharModal)

        load.hide()

        async function fecharModal(){
            modal.classList.remove("ativo")
            btnVoltar.removeEventListener("click", fecharModal)
        }
    }

        

    async function getChamadoById(id){
        const url = `${apiURL}/works/${id}`
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        }

        try{
            const data = await (await fetch(url, options)).json()
            return data
        }
        catch(error){
            console.log(error)
        }
    }

}