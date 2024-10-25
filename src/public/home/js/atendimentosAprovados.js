import apiURL from "../../globals/js/apiURL.js";
import gerarGrafico from "./grafico.js";
import Loading from "../../globals/js/loading.js";

export default async function atendimentosAprovados() {
    const dataHoje = new Date().toISOString().split('T')[0];
    const url = apiURL + `/works/0/${dataHoje}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }
    try{
        const response = await fetch(url, options);
        const data = await response.json();
        const dataAprovados = data.filter(item => item.status === 'ACCEPTED');
        gerarGrafico(dataAprovados);
        criarListaAprovados(dataAprovados);
    }
    catch(err){
        console.error(err)
    }




    function criarListaAprovados(data){
        const lista = document.querySelector('.atendimentos-lista');
        lista.innerHTML = '';
        for(const item of data){
            const li = template(item);
            lista.appendChild(li);
            li.dataset.id = item.id;
            li.querySelector('img').addEventListener('click', abrirModal);
        }
    }

    function template(item){
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="atendimento">
            <p>${item.place} <span class="status" data-status="${item.status}"></span></p>
            <p class="unidade">${item.campus} - ${item.unit}</p>
        </div>
        <img src="/globals/imagens/icones/visao-geral.svg" alt="">
        `
        li.dataset.id = item.id;
        return li
    }

    async function abrirModal() {
        const load = new Loading();
        load.show();
        const modal = document.querySelector('[data-modal="editar"]');
        modal.classList.add('ativo');
        const id = this.parentElement.dataset.id;
        const url = apiURL + `/works/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }

        try{
            const response = await fetch(url, options);
            const data = await response.json();
            preencherModal(data);
            modal.classList.add('modal-active');
            modal.querySelector('.btn-editar').addEventListener('click', editarAtendimento);
            modal.querySelector('.btn-voltar').addEventListener('click', fecharModal);
        }
        catch(err){
            console.error(err)
        }

        load.hide();

        function editarAtendimento(event){
            const id = event.target.closest('.modal-container').dataset.id;
            const url = `/editarAtendimento/${id}`;
            window.location = url;
        }
    }

    function preencherModal(data){
        const modal = document.querySelector('[data-modal="editar"]');
        modal.dataset.id = data.id;
        const local = modal.querySelector('h3');
        const campus = modal.querySelector('.modalCampus');
        const unidade = modal.querySelector('.modalUnidade');
        const status = modal.querySelector('.modalStatus');
        const funcionarios = modal.querySelector('.listaFuncionarios')
        funcionarios.innerHTML = ''

        local.textContent = data.place;
        campus.textContent = data.campus
        unidade.textContent = data.unit

        status.dataset.modal_status = data.status

        if(data.status === 'PENDING'){
            status.textContent = 'Pendente'
        } else if(data.status === 'ACCEPTED'){
            status.textContent = 'Aprovado';
        } else if(data.status === 'REJECTED'){
            status.textContent = 'Rejeitado';
        }

        data.workers.forEach(item => {
            const li = document.createElement('li')
            const template = `
            <p>${item.name}</p>
            <p>${item.function}</p>
            `
            li.innerHTML = template

            funcionarios.appendChild(li)
        });
    }

    function fecharModal(){
        const modal = document.querySelector('[data-modal="editar"]');
        modal.classList.remove('ativo');
    }



}