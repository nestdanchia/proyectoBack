import * as usersService from '../services/users.service.js';

// ─────────────────────────────────────────────────────────────────────────────
// Controladores asincrónicos: usan await al llamar al servicio.
//
// Estrategia de errores usada: try/catch + next(err) → errorHandler centralizado.
// Es portable (sirve en Express 4 y 5) y da control para transformar el error
// antes de delegarlo.
//
// ALTERNATIVA Express 5 (auto-catch): como este proyecto usa Express 5.3.0,
// los handlers async NO necesitan try/catch. Si la Promesa del await se rechaza,
// Express la captura y la pasa automáticamente al errorHandler. Cada handler de
// abajo lleva un comentario "Alternativa Express 5" mostrando cómo quedaría sin
// try/catch. El errorHandler NO cambia: es el mismo bajo ambas estrategias.
// ─────────────────────────────────────────────────────────────────────────────
export const getUsers = async (req, res, next) => {
    try {
        const usuarios = await usersService.getAllUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
    // ── Alternativa Express 5 (sin try/catch ni next) ──────────────────────────
    // En Express 5, si un handler async rechaza, Express captura la Promesa y la
    // deriva solo al errorHandler. Este handler podría quedar así:
    //
    //   const usuarios = await usersService.getAllUsers();
    //   res.status(200).json(usuarios);
    //
    // Si getAllUsers() rechaza NO hace falta try/catch: Express llama al
    // errorHandler por nosotros. Aquí usamos try/catch + next(err) porque es
    // portable a Express 4 y permite transformar el error antes de delegar.
};

export const createNewUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validación sincrónica: se responde directo (no es un error de runtime)
        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios',
                mensaje: 'Por favor, completa name, email y password.'
            });
        }

        const usuarioGuardado = await usersService.registerUser(name, email, password);

        res.status(201).json({
            mensaje: '¡Usuario registrado con éxito en la API!',
            usuarioGuardado
        });
    } catch (error) {
        next(error);
    }
    // ── Alternativa Express 5 (sin try/catch) ──────────────────────────────────
    // La validación de los 400 se mantiene igual (responde directo, no lanza);
    // solo se quita el try/catch que envuelve al await:
    //
    //   const { name, email, password } = req.body;
    //   if (!name || !email || !password) {
    //       return res.status(400).json({ ... });
    //   }
    //   const usuarioGuardado = await usersService.registerUser(name, email, password);
    //   res.status(201).json({ ... });
    //
    // Si registerUser() rechaza, Express 5 lo deriva solo al errorHandler.
};

export const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const usuario = await usersService.getUserById(userId);
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
    // ── Alternativa Express 5 (sin try/catch ni next) ──────────────────────────
    //   const usuario = await usersService.getUserById(req.params.id);
    //   res.status(200).json(usuario);
    //
    // Si getUserById() lanza (ej. el error con status 404 de "no existe"),
    // Express 5 lo deriva solo al errorHandler, que respeta err.status = 404.
};
