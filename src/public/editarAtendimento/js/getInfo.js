import apiURL from "../../globals/js/apiURL.js";
import deletarFuncionario from "./deletarFuncionario.js";

export default async function getInfo(){
    const idAtendimento = window.location.pathname.split('/').pop();
    console.log(idAtendimento);
    
    const url = `${apiURL}/works/${idAtendimento}`;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }

    try{
        const atendimento = await ( await fetch(url, options)).json()
        console.log(atendimento);
        mostrarInfo(atendimento);
    }
    catch(error){
        console.log(error);
    }
}


function mostrarInfo(atendimento){
    const seletorCampus = document.querySelector('#campus');
    const seletorData = document.querySelector('#data');
    const seletorUnidade = document.querySelector('#unidade');
    const seletorLocal = document.querySelector('#local');

    seletorCampus.disabled = true;
    seletorCampus.innerHTML = `<option value="0">${atendimento.campus}</option>`;

    const dataDoAtendimento = new Date(atendimento.date).toISOString();
    const dataFormatada = dataDoAtendimento.split('T')[0];
    seletorData.value = dataFormatada
    seletorData.disabled = true;

    seletorUnidade.disabled = true;
    seletorUnidade.innerHTML = `<option value="0">${atendimento.unit}</option>`;
    seletorLocal.value = atendimento.place;

    const funcionarios = atendimento.workers;
    const container = document.querySelector('.funcionarios-container');
    
    container.innerHTML = '';
    funcionarios.forEach(funcionario => {
        const div = document.createElement('div');
        div.classList.add('funcionario-info-container');
        div.dataset.idFunc = funcionario.id;
        div.innerHTML = `<div class="funcionario-info">
                            <p>${funcionario.name}</p>
                            <p>${funcionario.function}</p>
                        </div>
                        <img src="../../globals/imagens/icones/lixo.svg" alt="">`
        container.appendChild(div);
        const img = div.querySelector('img')
        img.addEventListener('click', deletarFuncionario)
    })
}