import modalHTML from './renderizar-modal.html?raw';
import './renderizar-modal.css'
import { cargarUsuarioPorId } from '../../casos-de-uso/obtener-usuario-por-id';

let modal, form;
let usuarioCargado = {};

export const mostrarModal = async( id ) => {
    modal?.classList.remove('esconder-modal');
    usuarioCargado = {};
    
    if(!id) return;
    const usuario = await cargarUsuarioPorId(id);
    establecerValoresFormulario(usuario)
}

export const esconderModal = () => {
    modal?.classList.add('esconder-modal');
    form?.reset();
}

const establecerValoresFormulario = ( usuario ) => {
    form.querySelector('[name="firstName"]').value = usuario.firstName;
    form.querySelector('[name="lastName"]').value = usuario.lastName;
    form.querySelector('[name="balance"]').value = usuario.balance;
    form.querySelector('[name="isActive"]').checked = usuario.isActive;
    usuarioCargado = usuario;
}
/**
 * 
 * @param {HTMLDivElement} elemento 
 */
export const renderizarModal = ( elemento, usuarioCallback ) => {
    if( modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.classList.add('modal-contenedor', 'esconder-modal');
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        if(event.target.className === 'modal-contenedor') {
            esconderModal();
        }
    });

    form.addEventListener('submit', async(event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const pareceUsuario = {...usuarioCargado}

        for(const [key, value] of formData) {
            if(key === 'balance') {
                pareceUsuario[key] = +value;
                continue; 
            }

            if(key === 'isActive') {
                pareceUsuario[key] = (value === 'on') ? true : false;
                continue;
            }
            pareceUsuario[key] = value;
        }
        pareceUsuario.isActive = form.querySelector('[name="isActive"]').checked;

        await usuarioCallback(pareceUsuario)
        esconderModal();
    });

    elemento.append( modal );
}