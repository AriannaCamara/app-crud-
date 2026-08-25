import { localhostModeloDeUsuario } from "../adaptador-de-datos/localhost-usuario.adaptadorDato";
import { Usuario } from "../modelos/usuario";

/**
 * 
 * @param {Number | String} id 
 * @return { Promise<Usuario>}
 */
export const cargarUsuarioPorId = async( id ) => {

    const url = `${import.meta.env.VITE_BASE_URL}/usuarios/${ id }`;
    const res = await fetch(url);
    const respuesta = await res.json();

    const usuario = localhostModeloDeUsuario( respuesta );
    
    return usuario;
}
