// Base de datos temporal simulada en memoria
const usuariosRegistrados = [];

// Simula la latencia de una operación de I/O real (ej. consulta a BD)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Todos los métodos del servicio son asincrónicos: devuelven Promesas.
// Así el controlador debe usar await y puede capturar errores con try/catch.
export const getAllUsers = async () => {
    await delay(100); // simula latencia de la "BD"
    return usuariosRegistrados;
};

export const registerUser = async (name, email, password) => {
    await delay(100);
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

export const getUserById = async (id) => {
    await delay(100);
    const usuario = usuariosRegistrados.find((u) => u.id === Number(id));

    // Lanzamos un error "tipado" con status 404 si no existe.
    // El controlador lo atrapa en su catch y lo deriva al errorHandler.
    if (!usuario) {
        const error = new Error(`No existe un usuario con id ${id}`);
        error.status = 404;
        throw error;
    }

    return usuario;
};
