import apiURL from "../../globals/js/apiURL.js";
import addFuncionarioChamado from "./addFuncionarioChamado.js";

export default function abrirBusca() {
    const buscaResultados = document.querySelector('.containerBusca ul');
    const inputBusca = document.querySelector('#busca');
    inputBusca.addEventListener('click', abrirMenuBusca);
    inputBusca.addEventListener('blur', fecharMenuBusca);
    buscarFuncionarios();

    let itens = []

    async function buscarFuncionarios(){
        const url = `${apiURL}/workers/`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
        try{
            const funcionarios = await ( await fetch(url, options)).json()
            console.log(funcionarios);
            mostrarFuncionarios(funcionarios);

        }catch(error){
            console.log(error);
        }
    }

    function mostrarFuncionarios(funcionarios){
        buscaResultados.innerHTML = '';
        
        funcionarios.forEach((funcionario) => {
            const li = document.createElement('li');
            li.innerHTML = `<p>${funcionario.name}</p> <p>${funcionario.function}</p>`;
            li.dataset.id = funcionario.id;
            buscaResultados.appendChild(li);
            itens.push(li);
        })
        const pessoas = document.querySelectorAll('.containerBusca ul li');
        pessoas.forEach(pessoa => {
            pessoa.addEventListener('click', addFuncionario)
        })
    }

    async function abrirMenuBusca() {
        buscaResultados.classList.add('ativo');
        buscador();
    }


    // rever essa função de Fechar o menu, pq tá erradona

    function fecharMenuBusca(event) {
        setTimeout(() => {
            if (event.target.value === '') {
                buscaResultados.classList.remove('ativo');
            }
        }, 200); // Pequeno atraso para permitir o clique ser processado
    }

    // rever essa função de Fechar o menu, pq tá erradona

    function buscador(funcionarios){
    
        inputBusca.addEventListener("input", buscarPessoas)
    
        function buscarPessoas(event){
            const valor = event.target.value.toUpperCase();
            buscaResultados.innerHTML = ""
            itens.forEach(item => {
                const nome = item.querySelector("[data-id] p").textContent.toUpperCase();
                if(nome.startsWith(valor)){
                    buscaResultados.appendChild(item)
                }
            })
            
        }
    }

    function addFuncionario(event){
        const li = event.target.closest('li');
        const id = li.dataset.id;
        addFuncionarioChamado(id);
    }
}