import * as usersService from '../services/users.service.js';

export const getUsers = (req, res) => {
    const usuarios = usersService.getAllUsers();
    res.status(200).json(usuarios);
};

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
