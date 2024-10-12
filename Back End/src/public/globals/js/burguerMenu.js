export default function burguerMenu() {
    const burguerBtn = document.querySelector('.burguerMenu')
    const burguerMenu = document.querySelector('.burguerMenu-info')
    burguerBtn.addEventListener('click', menuManager)
    window.addEventListener('resize' , viewWidth)

    function menuManager() {
        if (!burguerMenu.classList.contains('ativo')) {
            burguerMenu.classList.add('ativo')
            burguerBtn.querySelector('img').src = '/globals/imagens/icones/close.svg'
        }
        else {
            burguerMenu.classList.remove('ativo')
            burguerBtn.querySelector('img').src = '/globals/imagens/icones/menu.svg'
        }
    }

    function viewWidth() {
        if (window.innerWidth > 1400) {
            burguerMenu.classList.remove('ativo')
            burguerBtn.querySelector('img').src = '/globals/imagens/icones/menu.svg'
        }
    }


}