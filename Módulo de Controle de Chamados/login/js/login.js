import apiURL from '../../globals/js/apiURL.js';
import tratamentoErro from './tratamentoErro.js';
import Loading from '../../globals/js/loading.js';

export default function login() {
    const form = document.querySelector('.login');
    form.addEventListener('submit', enviarDados)

    async function enviarDados(event) {
        event.preventDefault();

        if(!tratamentoErro()) return

        const load = new Loading()
        load.show()

        const email = document.querySelector('#email').value
        const password = document.querySelector('#senha').value

        const body = {
            email: email,
            password: password
        }

        const rota = apiURL + '/auth/login'

        try{
            const resultado = await fetch(rota, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })




            const resultadoJson = await resultado.json()

            if (resultado.status === 200) {
                window.location.href = '/home.html'
            } else {
                form.querySelector('#apiError').textContent = resultadoJson.message
            }
    } catch (error) {
        form.querySelector('#apiError').textContent = 'Erro ao tentar fazer login'
    }

        load.hide()
        
    }
}