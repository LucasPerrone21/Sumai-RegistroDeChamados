import apiURL from "../../globals/js/apiURL.js";

export default async function getCampus() {
    const campusSelect = document.querySelector("#campus");
    const url = `${apiURL}/campus`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    }

    try{
        const campusAPI = await(await fetch(url, options)).json();

        campusAPI.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        })

        campusSelect.innerHTML = "";

        const option = document.createElement("option");
        option.value = "0";
        option.textContent = "Todos";
        campusSelect.appendChild(option);

        
        campusAPI.forEach(campus => {
            const option = document.createElement("option");
            option.value = campus.id;
            option.textContent = campus.name;
            campusSelect.appendChild(option);
        })
    }
    catch(error){
        console.error(error);
    }
}