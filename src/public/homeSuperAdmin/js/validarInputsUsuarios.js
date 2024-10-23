export default function validateInputsUsuario(dados){
    if(dados.name === "" || dados.email === "" || dados.password === "" || dados.empresa === "" || dados.role === ""){
        return false;
    }
    if(dados.password.length < 6){
        return false;
    }
    if(dados.name.length < 3){
        return false;
    }
    console.log(dados.empresa)
    if(typeof dados.role !== "string"){
        console.log(dados.role)
        return false;
    }

    return true;
}