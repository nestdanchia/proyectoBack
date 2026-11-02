import * as usersService from '../services/users.service.js';
//Recibe req, llama al servicio y envía res
// Controller (Traductor HTTP) 2. Extrae req.body, req.params, 
// valida los datos, llama al servicio, 
// toma el resultado y responde con res.status().json().
// getUsers (Controlador) no busca los datos directamente; 
// le pide 
// al servicio usersService.getAllUsers() que lo haga
export const getUsers = (req, res, next) => {
    try {
        const usuarios = usersService.getAllUsers();
        res.status(200).json(usuarios);
        // cualquier error que lance getALLUsers() caera en errorHandler
    } catch (error) {
        // Delegamos el error al middleware errorHandler mediante next()
        next(error);
    }
};
/*
Express funciona como una tubería secuencial (un pipeline).
 Cuando se llam a next(error) en  el controlador getUsers,
  Express frena la ejecución normal de las rutas y
   empieza a bajar verticalmente por tu archivo index.js
    buscando únicamente
 middlewares que tengan 4 parámetros (err, req, res, next).
 1. Ignora el notFoundHandler: Pasa de largo por app.use(notFoundHandler) porque ese middleware tiene solo 2 parámetros (req, res). Express sabe que no está preparado para procesar errores.
2. Frena en  errorHandler: Al llegar a app.use(errorHandler),
 Express ve que tiene los 4 parámetros requeridos. Detiene el viaje ahí, le inyecta el error en el primer parámetro (err) y ejecuta tu lógica para darle la respuesta final al cliente.

*/
export const createNewUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Faltan campos obligatorios",
            mensaje: "Por favor, completa name, email y password."
        });
    }

    const usuarioGuardado = usersService.registerUser(name, email, password);
    console.log(`Usuario registrado en consola: ${name} (${email})`);

    res.status(201).json({
        mensaje: "¡Usuario registrado con éxito en la API!",
        usuarioGuardado
    });
};

export const getUserById = (req, res) => {
    const userId = req.params.id;
    res.status(200).json({
        mensaje: "Petición GET recibida con parámetro de ruta",
        usuarioBuscadoId: userId,
        urlSimulada: `/users/${userId}`
    });
};
