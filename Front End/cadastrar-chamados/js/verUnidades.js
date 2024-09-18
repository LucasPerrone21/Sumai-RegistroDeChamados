import apiUrl from '../../globals/js/apiURL.js';

export default async function verUnidades(){

    const campusContainer = document.querySelector('#campus');
    const unidadesContainer = document.querySelector('#unidade');

    try{
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }
        const campusList = await (await fetch(`${apiUrl}/campus` , options)).json();
        
        campusList.sort((a, b) => a.name.localeCompare(b.nome));

        campusContainer.innerHTML = '';
        campusList.forEach((campus) => {
            const option = document.createElement('option');
            option.value = campus.id;
            option.innerText = campus.name;
            campusContainer.appendChild(option);
        })
        listarUnidades();
        campusContainer.addEventListener('change', listarUnidades);

    }
    catch(error){
        console.log(error);
    }

    async function listarUnidades(){
        const id = campusContainer.value;
        unidadesContainer.innerHTML = '';
        try{
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
            const unidadesList = await (await fetch(`${apiUrl}/unit/${id}` , options)).json();
            unidadesList.sort((a, b) => a.name.localeCompare(b.nome));
            unidadesList.forEach((unidade) => {
                const option = document.createElement('option');
                option.value = unidade.id;
                option.innerText = unidade.name;
                unidadesContainer.appendChild(option);
            })
        }
        catch(error){
            console.log(error);
        }

    }
}