import { localhostModeloDeUsuario } from "../adaptador-de-datos/localhost-usuario.adaptadorDato";
import { ModeloDeUsuarioLocalhost } from "../adaptador-de-datos/usuario-localhost.adaptador";
import { Usuario } from "../modelos/usuario"


export const guardarUsuario = async( pareceUsuario ) => {
    
    const usuario = new Usuario(pareceUsuario);
    if( !usuario.firstName || !usuario.lastName) throw 'Primer y segundo nombre son obligatorios';

    const guardarUsuario = ModeloDeUsuarioLocalhost(usuario);
    let usuarioActualizado;

    if( usuario.id ) {
        usuarioActualizado = await actualizarUsuario(guardarUsuario);
    } else {
        usuarioActualizado = await crearUsuario(guardarUsuario);
    }

    return localhostModeloDeUsuario( usuarioActualizado)
}

const crearUsuario = async( usuario ) => {
    const url = `${import.meta.env.VITE_BASE_URL}/usuarios`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify( usuario ),
        headers: {
            'content-Type': 'application/json'
        }
    });
    const nuevoUsuario = await res.json();
    console.log({nuevoUsuario})
    return nuevoUsuario;
}

const actualizarUsuario = async( usuario ) => {
    const url = `${import.meta.env.VITE_BASE_URL}/usuarios/${ usuario.id }`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify( usuario ),
        headers: {
            'content-Type': 'application/json'
        }
    });
    const usuarioActualizado = await res.json();
    
    return usuarioActualizado;
}