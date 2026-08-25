import { guardarUsuario } from "./casos-de-uso/guardar-usuario";
import { renderizarAgregarBoton } from "./presentacion/renderizar-agregra-boton/renderizar-agregar-boton";
import { renderizarBotones } from "./presentacion/renderizar-botones/renderizar-botones";
import { renderizarModal } from "./presentacion/renderizar-modal/renderizar-modal";
import { renderizarTabla } from "./presentacion/renderizar-tabla/renderizar-tabla";
import usuariosStore from "./store/usuarios-store";

/**
 * 
 * @param {HTMLDivElement} elemento 
 */
export const UsuariosApp = async( elemento ) => {
    elemento.innerHTML = 'Loading...';
    await usuariosStore.cargarSiguientePagina();
    elemento.innerHTML = '';

    renderizarTabla( elemento );

    const contenedorAcciones = document.createElement('div');

    contenedorAcciones.classList.add('contenedor-acciones');

    elemento.append(contenedorAcciones);

    renderizarBotones(contenedorAcciones);
    renderizarAgregarBoton(contenedorAcciones);

    renderizarModal( elemento, async( pareceUsuario ) => {
        const usuario = await guardarUsuario( pareceUsuario );
       
        usuariosStore.cuandoUnUsuarioCambia( usuario );
        renderizarTabla();
    });
}
