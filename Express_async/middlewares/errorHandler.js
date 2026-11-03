// Middleware para manejar rutas no encontradas (404)
// Se ejecuta para cualquier ruta que no coincida con las definidas.
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 404,
        mensaje: 'Recurso no encontrado o ruta inválida en este servidor.',
        rutaIntentada: req.url
    });
};

// Middleware para manejo centralizado de errores.
// Se activa cuando un controlador o middleware llama a next(err).
// Respeta un estado personalizado (err.status) o usa 500 por defecto,
// y no filtra el stack trace al cliente.
//
// NOTA: este middleware NO varía entre las dos estrategias. Tanto si el
// controlador usa try/catch + next(err) como si se usa el auto-catch de
// Express 5, este errorHandler queda exactamente igual: Express lo invoca
// igual en ambos casos. Lo único que cambia con la alternativa Express 5 es
// el controlador (se le quita el try/catch); el errorHandler se mantiene.
export const errorHandler = (err, req, res, next) => {
    console.error('Error capturado por el errorHandler:');
    console.error(err.stack || err.message);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: statusCode,
        mensaje: statusCode === 500
            ? 'Ocurrió un error interno en el servidor.'
            : err.message
    });
};
