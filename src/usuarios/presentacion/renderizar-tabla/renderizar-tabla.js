import { borrarUsuario } from '../../casos-de-uso/borrar-usuario-por-id';
import usuariosStore from '../../store/usuarios-store';
import { mostrarModal } from '../renderizar-modal/renderizar-modal';
import './renderizar-tabla.css';

let tabla;

const crearTabla = () => {
    const tabla = document.createElement('table');
    const tablaEncabezados = document.createElement('thead');

    tablaEncabezados.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
        </tr>
    `;
    const cuerpoDeLaTabla = document.createElement('tbody');
    tabla.append(tablaEncabezados, cuerpoDeLaTabla);
    return tabla;
}

const tablaSeleccionarListener = ( evento ) => {
    const elemento = evento.target.closest('.btn-seleccionar');
    if(!elemento) return;

    const id = elemento.getAttribute('data-id');
    mostrarModal(id);
}
 
const tablaBorrarListener = async( evento ) => {
    const elemento = evento.target.closest('.btn-borrar');
    if(!elemento) return;

    const id = elemento.getAttribute('data-id');
    try {
        await borrarUsuario(id);
        await usuariosStore.recargarPagina();

        document.querySelector('#pagina-actual').innerText = usuariosStore.obtenerPaginaActual();
        renderizarTabla( elemento );

    } catch (error) {
        console.log(error);
        alert('No se pudo eliminar');
    }
    
}

/**
 * 
 * @param {HTMLDivElement} elemento 
 */
export const renderizarTabla = (elemento) => {
    const usuarios = usuariosStore.obtenerUsuarios();
    if( !tabla ) {
        tabla = crearTabla();
        elemento.append(tabla);

        tabla.addEventListener('click', evento => tablaSeleccionarListener(evento));
        tabla.addEventListener('click', evento => tablaBorrarListener(evento));
    }

    let tablaHTML = '';

    usuarios.forEach(usuario => {
        tablaHTML += `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.balance}</td>
                <td>${usuario.firstName}</td>
                <td>${usuario.lastName}</td>
                <td>${usuario.isActive}</td>
                <td class="acciones">
                    <a href="#/" class="btn-seleccionar" data-id="${usuario.id}">
                        Seleccionar
                    </a>

                    <a href="#/" class="btn-borrar" data-id="${usuario.id}">
                        Borrar
                    </a>
                </td>
            </tr>
        `
    });

    tabla.querySelector('tbody').innerHTML = tablaHTML;
}