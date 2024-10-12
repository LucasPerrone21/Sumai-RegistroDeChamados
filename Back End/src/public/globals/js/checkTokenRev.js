import apiURL from "../../globals/js/apiURL.js";

export default async function checkTokenRev() {
    const url = apiURL + '/auth/checkAuth';

    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
        if (response.status === 200) {
            window.location.href = '/home';
        }
        else{
            return;
        }
    } catch (error) {
        return;
    }
}