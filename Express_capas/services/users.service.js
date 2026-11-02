// Base de datos temporal simulada en memoria
const usuariosRegistrados = [];
// El servicio es sincrónico y solo hace push a un array en memoria: no lanza errores.
export const getAllUsers = () => {
    return usuariosRegistrados;
};

export const registerUser = (name, email, password) => {
    const nuevoUsuario = {
        id: usuariosRegistrados.length + 1,
        name,
        email,
        password,
        fechaRegistro: new Date()
    };
    usuariosRegistrados.push(nuevoUsuario);
    return nuevoUsuario;
};
