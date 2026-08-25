import { localhostModeloDeUsuario } from "../adaptador-de-datos/localhost-usuario.adaptadorDato";
import { Usuario } from "../modelos/usuario";


let hayPaginaSiguiente = true;
/**
 * 
 * @param {Number} pagina 
 * @return { Promise<Usuario[]>}
 */
export const cargarUsuariosPorPagina = async( pagina = 1) => {

    const url = `${import.meta.env.VITE_BASE_URL}/usuarios?_page=${ pagina }`;
    const res = await fetch(url);
    const respuesta = await res.json();

    hayPaginaSiguiente = respuesta.next !== null;

    const data = respuesta.data;

    const usuarios = data.map( luceComoUsuario => localhostModeloDeUsuario( luceComoUsuario ))
    return usuarios;
}

export const existePaginaSiguiente = () => hayPaginaSiguiente;
