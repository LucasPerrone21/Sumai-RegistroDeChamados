export default function validateInputsTercerizada(dados){
    if(dados.name === "" || dados.email === "" || dados.cnpj === "" || dados.tel === ""){
        return false;
    }
    if(dados.name.length < 3){
        return false;
    }
    if(dados.email.length < 3){
        return false;
    }
    if(dados.cnpj.length < 3){
        return false;
    }
    if(dados.tel.length < 3){
        return false;
    }
    return true;
}