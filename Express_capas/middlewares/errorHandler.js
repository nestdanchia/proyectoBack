// Middleware para manejar rutas no encontradas (404)
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 404,
        mensaje: "Recurso no encontrado o ruta inválida en este servidor.",
        rutaIntentada: req.url
    });
};

// Middleware para manejo centralizado de errores (500) con el codigo actual 
// nunca se ejecuta porque en este ejemplo 
// Los controladores responden directamente con res.status(...).json(...) 
// y devuelven. Nunca llaman next(err)
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 500,
        mensaje: "Ocurrió un error interno en el servidor.",
        detalle: err.message
    });
};
