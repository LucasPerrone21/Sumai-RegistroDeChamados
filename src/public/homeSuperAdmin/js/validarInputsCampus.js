export default function validateInputsCampus(dados){
    if(dados.name === "" || dados.address === ""){
        return false;
    }
    if(dados.name.length < 3){
        return false;
    }
    if(dados.address.length < 3){
        return false;
    }

    return true;
}