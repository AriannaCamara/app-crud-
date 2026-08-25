import { mostrarModal } from "../renderizar-modal/renderizar-modal";

/**
 * 
 * @param {HTMLDivElement} elemento 
 */
export const renderizarAgregarBoton = ( elemento ) => {

    const agregarBoton = document.createElement('button');
    agregarBoton.innerText = ' + ';
    agregarBoton.classList.add('agregar-boton');

    elemento.append( agregarBoton );
    
    agregarBoton.addEventListener('click', () => {
        mostrarModal();
    });
}