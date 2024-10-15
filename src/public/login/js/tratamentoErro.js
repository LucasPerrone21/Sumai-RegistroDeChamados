export default function tratamentoErro(){
    const emailRegex = /\S+@\S+\.\S+/

    const email = document.querySelector('#email')
    const password = document.querySelector('#senha')


    if(!emailRegex.test(email.value)){
        email.classList.add('error')
        emailError.textContent = 'Insira um email válido'
        return false
    }
    emailError.textContent = ''
    email.classList.remove('error')

    if(password.value.length < 6){
        password.classList.add('error')
        passwordError.textContent = 'Insira uma senha válida'
        return false
    }
    password.classList.remove('error')
    passwordError.textContent = ''

    return true

} 