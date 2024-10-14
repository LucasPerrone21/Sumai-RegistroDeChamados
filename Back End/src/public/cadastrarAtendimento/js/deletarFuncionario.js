export default function deletarFuncionario(event){
    const funcionario = event.target.closest('[data-id-func]')
    const nome = funcionario.querySelector('.funcionario-info p').innerText
    const id = funcionario.dataset.idfunc
    const modal = document.querySelector('.modalContainer[data-tipo="deletar"]')
    modal.querySelector('.negrito').innerText = nome
    modal.classList.add('ativo')
    const botaoSim = modal.querySelector('.btnExcluir')
    const botaoNao = modal.querySelector('.btnRevisao')

    botaoSim.addEventListener('click', apagar)
    botaoNao.addEventListener('click', fecharModal)

    function fecharModal(){
      modal.classList.remove('ativo')
      botaoSim.removeEventListener('click', apagar)
      botaoNao.removeEventListener('click', fecharModal)
    }

    function apagar(){
        funcionario.remove()
        fecharModal()
    }
}