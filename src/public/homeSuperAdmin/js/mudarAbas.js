import Loading from "../../globals/js/loading.js";
import openUsuarios from "./openUsuarios.js";
import openCampus from "./openCampus.js";


export default async function mudarAbas(){

    const load = new Loading();
    
    const sections = document.querySelectorAll('[data-tipo]');
    const seletores = document.querySelectorAll('.seletor');
    const burguerMenu = document.querySelector('.burguerMenu-info');


    seletores.forEach( seletor => {
        seletor.addEventListener('click', abrirSection);
    })

    seletores[0].click();

    async function abrirSection(event){

        load.show()

        const tipo = this.dataset.tipo;
        let section

        sections.forEach( s => {
            s.classList.remove('ativo');
            if(s.dataset.tipo === tipo){
                section = s;
            }
        })
        section.classList.add('ativo');

        if(tipo === 'usuarios'){
            await openUsuarios();
        }
        else if(tipo === 'campus'){
            await openCampus();
        }

        if (burguerMenu.classList.contains('ativo')){
            burguerMenu.classList.remove('ativo')
        }
        load.hide()
    }
}