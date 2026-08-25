import { Usuario } from "../modelos/usuario"

/**
 * 
 * @param {Like<Usuario>} localhostUsuario 
 * @returns {Usuario}
 */
export const localhostModeloDeUsuario = ( localhostUsuario ) => {

    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUsuario;

    return new Usuario({
        avatar,
        balance,
        firstName: first_name,
        gender,
        id,
        isActive,
        lastName: last_name,
    });
}