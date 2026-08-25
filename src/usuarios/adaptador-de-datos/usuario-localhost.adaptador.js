import { Usuario } from "../modelos/usuario"

/**
 * 
 * @param {Like<Usuario>} localhostUsuario 
 * @returns {Usuario}
 */
export const ModeloDeUsuarioLocalhost = ( usuario ) => {

    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName,
    } = usuario;

    return ({
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName,
    });
}