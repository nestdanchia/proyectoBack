// Middleware para manejar rutas no encontradas (404)
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 404,
        mensaje: "Recurso no encontrado o ruta inválida en este servidor.",
        rutaIntentada: req.url
    });
};

// Middleware para manejo centralizado de errores.
// Se activa cuando un controlador o middleware llama a next(err),
// por ejemplo getUsers lo invoca desde su catch.
export const errorHandler = (err, req, res, next) => {
    // Registramos el error completo en el servidor (no se expone al cliente)
    console.error('Error capturado por el errorHandler:');
    console.error(err.stack || err.message);

    // Si el error trae un estado definido lo respetamos; por defecto 500
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: statusCode,
        mensaje: statusCode === 500
            ? "Ocurrió un error interno en el servidor."
            : err.message
    });
};
