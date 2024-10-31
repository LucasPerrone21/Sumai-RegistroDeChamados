import Loading from "../../globals/js/loading.js";
import openUsuarios from "./openUsuarios.js";
import openCampus from "./openCampus.js";
import openUnidades from "./openUnidades.js";
import openTercerizadas from "./openTercerizadas.js";


export default async function mudarAbas(){

    const load = new Loading();
    
    const sections = document.querySelectorAll('[data-tipo]');
    const seletores = document.querySelectorAll('.seletor');
    const burguerMenuItens = document.querySelector('.burguerMenu-info');


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
        else if(tipo === 'unidades'){
            await openUnidades();
        }
        else if(tipo === 'empresas'){
            await openTercerizadas();
        }

        if (burguerMenuItens.classList.contains('ativo')){
            const burguerMenu = document.querySelector('.burguerMenu');
            burguerMenu.click();

        }
        load.hide()
    }
}