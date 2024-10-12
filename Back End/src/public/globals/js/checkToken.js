import apiURL from './apiURL.js';

export default async function checkToken() {
    const url = apiURL + '/auth/checkAuth';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (response.status === 200) {
        return;
    }
    else{
        window.location.href = '/';
    }
}