import apiURL from "../../globals/js/apiURL.js";


export default async function antendidmentosPendentes() {
    const campusSelect = document.querySelector('#campus');
    const dataInput = document.querySelector('#data');
    dataInput.value = new Date().toISOString().split('T')[0];
    const btn = document.querySelector('#buscarPendentes');
    await getCampi();
    btn.addEventListener('click', buscarPendentes);
    buscarPendentes();

    async function buscarPendentes() {
        const campus = campusSelect.value;
        const data = dataInput.value;
        const url = apiURL + `/works/${campus}/${data}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const dataPendentes = data.filter(item => item.status === 'PENDING');
            criarListaPendentes(dataPendentes);
        } catch (err) {
            criarListaPendentes([]);
        }
    }

    function criarListaPendentes(data) {
        const lista = document.querySelector('.lista-pendentes');
        lista.innerHTML = '';
        for (const item of data) {
            const li = template(item);
            lista.appendChild(li);
            li.dataset.id = item.id;
            li.querySelector('img').addEventListener('click', abrirModal);
        }
    }

    function template(item) {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="atendimento">
            <p>${item.place} <span class="status" data-status="${item.status}"></span></p>
            <p class="unidade">${item.campus} - ${item.unit}</p>
        </div>
        <img src="./globals/imagens/icones/visao-geral.svg" alt="">
        `
        li.dataset.id = item.id;
        return li
    }

    async function getCampi() {
        const url = apiURL + '/campus';
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            campusSelect.innerHTML = '<option value="0">Todos</option>';
            for (const item of data) {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
                campusSelect.appendChild(option);
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function abrirModal(event) {
        const id = event.target.closest('li').dataset.id;
        const url = apiURL + `/works/${id}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        try{
            const data = await (await fetch(url, options)).json();
            handleModal(data);
        }catch(err){
            console.error(err)
        }
    }

    function handleModal(data){
        const modal = document.querySelector('[data-modal="pendentes"]');
        modal.classList.add('ativo');
        modal.dataset.id = data.id;
        const local = modal.querySelector('h3');
        const campus = modal.querySelector('.modalCampus');
        const unidade = modal.querySelector('.modalUnidade');
        const status = modal.querySelector('.modalStatus');
        const btnVoltar = modal.querySelector('.btn-voltar');
        const btnAprovar = modal.querySelector('.btn-aprovar');
        const btnReprovar = modal.querySelector('.btn-reprovar');

        btnVoltar.addEventListener('click', fecharModal);
        btnAprovar.addEventListener('click', abrirModalAprovar);
        btnReprovar.addEventListener('click', abrirModalReprovar);




        local.textContent = data.place;
        campus.textContent = data.campus;
        unidade.textContent = data.unit;

        if(data.status === 'PENDING'){
            status.textContent = 'Pendente'
        } else if(data.status === 'ACCEPTED'){
            status.textContent = 'Aprovado';
        } else if(data.status === 'REJECTED'){
            status.textContent = 'Rejeitado';
        }

        const funcionarios = modal.querySelector('.listaFuncionarios');
        funcionarios.innerHTML = '';
        data.workers.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
            <p>${item.name}</p>
            <p>${item.function}</p>
            `
            ;
            funcionarios.appendChild(li);
        })

        function fecharModal(){
            modal.classList.remove('ativo');
            btnVoltar.removeEventListener('click', fecharModal);
            btnReprovar.removeEventListener('click', abrirModalReprovar)
            btnAprovar.removeEventListener('click', abrirModalAprovar);
        }

        function abrirModalAprovar(){
            fecharModal();
            const modalAprovar = document.querySelector('[data-modal="aprovar"]');
            modalAprovar.classList.add('ativo');
            modalAprovar.dataset.id = data.id;
            const btnVoltar = modalAprovar.querySelector('.btn-voltar');
            const btnConfirmar = modalAprovar.querySelector('.btn-aprovar');

            btnVoltar.addEventListener('click', fecharModalAprovar);
            btnConfirmar.addEventListener('click', aprovarAtendimento);

            function fecharModalAprovar(){
                modalAprovar.classList.remove('ativo');
                btnVoltar.removeEventListener('click', fecharModalAprovar);
                btnConfirmar.removeEventListener('click', aprovarAtendimento);
            }

            async function aprovarAtendimento(){
                const id = modalAprovar.dataset.id;
                const url = apiURL + `/works/${id}/status`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({status: 'ACCEPTED'})
                }
                try{
                    const response = await fetch(url, options);
                    if(response.ok){
                        window.location.reload();    
                    }
                    fecharModalAprovar();
                }catch(err){
                    console.error(err)
                }
            }
        }

        function abrirModalReprovar(){
            fecharModal();
            const modalAprovar = document.querySelector('[data-modal="reprovar"]');
            modalAprovar.classList.add('ativo');
            modalAprovar.dataset.id = data.id;
            const btnVoltar = modalAprovar.querySelector('.btn-voltar');
            const btnConfirmar = modalAprovar.querySelector('.btn-reprovar');

            btnVoltar.addEventListener('click', fecharModalReprovar);
            btnConfirmar.addEventListener('click', reprovarAtendimento);

            function fecharModalReprovar(){
                modalAprovar.classList.remove('ativo');
                btnVoltar.removeEventListener('click', fecharModalReprovar);
                btnConfirmar.removeEventListener('click', reprovarAtendimento);
            }

            async function reprovarAtendimento(){
                const id = modalAprovar.dataset.id;
                const url = apiURL + `/works/${id}`;
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({status: 'REJECTED'})
                }
                try{
                    const response = await fetch(url, options);
                    if(response.ok){
                        window.location.reload();    
                    }
                    fecharModalReprovar();
                }catch(err){
                    console.error(err)
                }
            }
        }



    } 
}