import apiURL from "../../globals/js/apiURL.js";

export default function enviarChamado() {
    const form = document.querySelector('.form-container');
    const dataAtual = new Date();
    const data = document.querySelector('#data');
    data.value = dataAtual.toISOString().split('T')[0];
    form.addEventListener('submit', checarFormulario);

    function checarFormulario(event) {
        event.preventDefault();

        const campus = document.querySelector('#campus').value;
        const unidade = document.querySelector('#unidade').value;
        const data = document.querySelector('#data').value;
        const local = document.querySelector('#local').value;
        const funcionarios = document.querySelectorAll('.funcionario-info-container');
        const funcionariosId = [];
        funcionarios.forEach(item => {
            funcionariosId.push(Number(item.dataset.idFunc));
        });

        const chamado = {
            unit: Number(unidade),
            date: data,
            place: local,
            workers: funcionariosId
        }
          
                

        if (campus === '' || unidade === '' || data === '' || local === '') {
            alert('Preencha todos os campos!');
            return
        }


        abrirModal()

        function abrirModal(){
            const modal = document.querySelector('.modalContainer[data-tipo="prosseguir"]');
            modal.classList.add('ativo');
            const botaoSim = modal.querySelector('.btnConfirmar');
            const botaoNao = modal.querySelector('.btnRevisao');
            botaoSim.addEventListener('click', enviarChamado)
            botaoNao.addEventListener('click', fecharModal)

            function fecharModal(){
                modal.classList.remove('ativo');
                botaoNao.removeEventListener('click', fecharModal)
                botaoSim.removeEventListener('click', enviarChamado)
            }

            async function enviarChamado(){
                fecharModal()
                enviarChamadoAPI(chamado)
            }

        }


        async function enviarChamadoAPI(chamado){
            const idAtendimento = window.location.pathname.split('/').pop();
            const url = `${apiURL}/works/${idAtendimento}`;
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(chamado)
            }

            try{
                const response = await fetch(url, options)
                if(response.status === 201){
                    alert('Chamado cadastrado com sucesso!')
                    window.location.href = '/home'
                }

            }
            catch(error){
                console.log(error)
            }
        }

    }


}