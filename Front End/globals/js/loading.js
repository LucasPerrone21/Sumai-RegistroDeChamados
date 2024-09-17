
export default class Loading{
    show(){
        const loadingScreen = document.querySelector('.loadingContainer');
        loadingScreen.classList.add('ativo');
    }
    hide(){
        const loadingScreen = document.querySelector('.loadingContainer');
        loadingScreen.classList.remove('ativo');
    }
}