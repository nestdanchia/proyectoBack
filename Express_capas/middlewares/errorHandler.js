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
/*
•  En el console.error imprime el err.stack para 
 poder debuguear en terminal, pero al cliente 
 en el JSON solo se notifica que  
 "Ocurrió un error interno en el servidor.
 " si el estado es 500. 
 Esto evita que atacantes vean la estructura de  carpetas 
*  o información sensible de tu base de datos (como nombres de tablas) que podría estar en el mensaje del error. 
```javascript
    // Ejemplo de error potencial:
    // Error: select * from usuarios where id = 12345; - tabla no existe
    // Si no filtrás el mensaje, el atacante puede deducir estructuras de tu BD

```javascript
    // Por eso es importante:
    // 1. Registrar el error completo en consola (para devs)
    // 2. Enviar mensaje genérico al cliente (para seguridad)

```javascript
    // Esto es una buena práctica de seguridad y debugging.
    // Evita exponer información sensible como rutas del sistema
    // o mensajes de error de bases de datos al usuario final.
    •  Al poner const statusCode = err.status || 500;,
    middleware flexible. Si  servicio lanza un error controlado
     (ej: "El usuario no existe" con un status: 404),
      errorHandler va a respetar ese código. 
      Si es un error genérico (se cayó la base de datos), 
    le asigna el 500 por defecto.

*/
    // Si el error trae un estado definido lo respetamos; por defecto 500
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: statusCode,
        mensaje: statusCode === 500
            ? "Ocurrió un error interno en el servidor."
            : err.message
    });
};
