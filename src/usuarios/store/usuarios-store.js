import { cargarUsuariosPorPagina, existePaginaSiguiente } from "../casos-de-uso/cargar-usuarios-por-pagina";


const estado = {
    paginaActual: 0,
    usuarios: [],
}

const cargarSiguientePagina =  async() => {
    if(!existePaginaSiguiente()) return;

    const usuarios = await cargarUsuariosPorPagina( estado.paginaActual + 1);
    if( usuarios.length === 0 ) return;

    estado.paginaActual = estado.paginaActual + 1;
    estado.usuarios = usuarios;
}

const cargarPaginaAnterior =  async() => {
    if( estado.paginaActual === 1 ) return;
    const usuarios = await cargarUsuariosPorPagina( estado.paginaActual - 1);

    estado.paginaActual = estado.paginaActual - 1;
    estado.usuarios = usuarios;
}

const cuandoUnUsuarioCambia = ( usuarioActualizado ) => {
    let fueEncontrado = false;

    estado.usuarios = estado.usuarios.map(usuario => {
        if(usuario.id === usuarioActualizado.id ) {
            fueEncontrado = true;
            return usuarioActualizado;
        }
        return usuario;
    });

    if( estado.usuarios.length < 10 && !fueEncontrado ) {
        estado.usuarios.push(usuarioActualizado);
    } 
}

const recargarPagina =  async() => {
    //if(!existePaginaSiguiente()) return;

    const usuarios = await cargarUsuariosPorPagina( estado.paginaActual );
    if( usuarios.length === 0 ) return;
    estado.usuarios = usuarios;
}

export default {
    recargarPagina,
    cuandoUnUsuarioCambia,
    cargarPaginaAnterior,
    cargarSiguientePagina,

    /**
     * 
     * @returns {Usuario[]}
     */
    obtenerUsuarios: () => [...estado.usuarios],
    /**
     * 
     * @returns {Number}
     */
    obtenerPaginaActual: () => estado.paginaActual,
}

