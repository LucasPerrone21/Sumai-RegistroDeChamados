export default function atendimentosAprovados(atendimento) {
    function template(){
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="atendimento">
            <p>Sala da Reitoria <span class="status" data-status="APROVED"></span></p>
            <p class="unidade">Canela - Reitoria</p>
        </div>
        <img src="./globals/imagens/icones/visao-geral.svg" alt="">
        `
    }
}