export default function validateInputsUnidade(dados){
    if(dados.name === "" || dados.address === ""){
        return false;
    }
    if(dados.name.length < 3){
        return false;
    }
    if(isNaN(dados.cod_sipac)){
        console.log(dados.codSipac)
        return false;
    }
    if(isNaN(dados.latitude)){
        console.log(dados.latitude)
        return false;
    }
    if(isNaN(dados.longitude)){
        console.log(dados.longitude)
        return false;
    }
    return true;
}