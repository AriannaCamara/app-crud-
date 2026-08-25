import usuariosStore from '../../store/usuarios-store';
import { renderizarTabla } from '../renderizar-tabla/renderizar-tabla';
import './renderizar-botones.css';

/**
 * 
 * @param {HTMLDivElement} elemento 
 */
export const renderizarBotones = (elemento) => {

    const contenedorBotones = document.createElement('div');
    contenedorBotones.classList.add('contenedor-botones');

    const botonSiguiente = document.createElement('button');
    botonSiguiente.innerText = ' Siguiente > ';

    const botonAnterior = document.createElement('button');
    botonAnterior.innerText = ' < Anterior ';

    const paginaActualLabel = document.createElement('span');
    paginaActualLabel.id = 'pagina-actual';
    paginaActualLabel.innerText = usuariosStore.obtenerPaginaActual();

    elemento.append(
        botonAnterior,
        paginaActualLabel,
        botonSiguiente
    );

    elemento.append(contenedorBotones);

    botonSiguiente.addEventListener('click', async() => {
        await usuariosStore.cargarSiguientePagina();
        paginaActualLabel.innerText = usuariosStore.obtenerPaginaActual();
        renderizarTabla( elemento );
    });

    botonAnterior.addEventListener('click', async() => {
        await usuariosStore.cargarPaginaAnterior();
        paginaActualLabel.innerHTML = usuariosStore.obtenerPaginaActual();
        renderizarTabla( elemento );
    })
}

