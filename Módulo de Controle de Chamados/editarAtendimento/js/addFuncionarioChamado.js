import apiURL from "../../globals/js/apiURL.js";
import deletarFuncionario from "./deletarFuncionario.js";

export default async function addFuncionarioChamado(id) {
    try{
        const url = `${apiURL}/workers/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
        const funcionario = await ( await fetch(url, options)).json()
        abrirModal(funcionario)
        
    }
    catch(error){
        console.log(error);
    }

    function abrirModal(funcionario){

        const funcionariosHTML = document.querySelectorAll('.funcionario-info-container');
        const funcionariosId = []
        funcionariosHTML.forEach(item => {
            funcionariosId.push(Number(item.dataset.idFunc))
        })
        if(funcionariosId.includes(funcionario.id)){
            alert('Funcionário já foi adicionado a este chamado')
            return
        }
        const modal = document.querySelector('.modalContainer[data-tipo="chamado-addFunc"]');
        const nome = modal.querySelector('#funcName');
        nome.innerText = funcionario.name;
        modal.classList.add('ativo');
        const botaoSim = modal.querySelector('.btnConfirmar');
        const botaoNao = modal.querySelector('.btnRevisao');
        botaoSim.addEventListener('click', colocarNoContainer)
        botaoNao.addEventListener('click', fecharModal)

        function colocarNoContainer(){
            fecharModal()
            
            const container = document.querySelector('.funcionarios-container');
            const div = document.createElement('div');
            div.classList.add('funcionario-info-container');
            div.dataset.idFunc = funcionario.id;
            div.innerHTML = `<div class="funcionario-info">
                                <p>${funcionario.name}</p>
                                <p>${funcionario.function}</p>
                            </div>
                            <img src="./globals/imagens/icones/lixo.svg" alt="">`
            container.appendChild(div);
            const img = div.querySelector('img')
            img.addEventListener('click', deletarFuncionario)
        }

        function fecharModal(){
            modal.classList.remove('ativo');
            botaoSim.removeEventListener('click', colocarNoContainer)
            botaoNao.removeEventListener('click', fecharModal)
        }
    }
}
