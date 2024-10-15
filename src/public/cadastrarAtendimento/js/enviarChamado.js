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


        enviarChamadoAPI(chamado);

        async function enviarChamadoAPI(chamado){
            const url = `${apiURL}/works`;
            const options = {
                method: 'POST',
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
                    window.location.reload()
                }

            }
            catch(error){
                console.log(error)
            }
        }

    }


}