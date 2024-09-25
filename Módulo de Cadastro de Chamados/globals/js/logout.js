import apiURL from "./apiURL.js";

export default async function logout() {

    const btnLogout = document.querySelectorAll('.logout');

    btnLogout.forEach(btn => {
        btn.addEventListener('click', handleLogout);
    })


    async function handleLogout() {
        const url = apiURL + '/auth/logout';
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.status === 200) {
            window.location.href = '/index.html';
        }
        else{
            alert('Erro ao fazer logout');
        }
    }
}