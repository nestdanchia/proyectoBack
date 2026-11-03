import express from 'express';
import cors from 'cors';
import usuariosRouter from './routes/users.routes.js';
import productosRouter from './routes/products.routes.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Montaje de rutas con prefijo /api usando rutas relativas en cada router
app.use('/api/users', usuariosRouter);
app.use('/api/products', productosRouter);

// Manejador de rutas no encontradas (404) — debe ir antes que el errorHandler
app.use(notFoundHandler);

// Manejador global de errores (500) — debe ir último (4 parámetros)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor API REST (async) corriendo en http://localhost:${PORT}`);
});

/* ════════════════════════════════════════════════════════════════════════════
   FLUJO COMPLETO DE UNA PETICIÓN (asincrónico)
   Capas: index.js  →  router  →  controller (async)  →  service (async/Promesa)

   Ejemplo: GET http://localhost:3000/api/users/2

   1) LLEGA LA PETICIÓN A index.js
      - cors() y express.json() son middlewares globales: se ejecutan SIEMPRE
        antes de cualquier ruta. express.json() parsea el body si lo hay.
      - Express ve que la ruta empieza con "/api/users" y se la pasa a
        usuariosRouter (montado con app.use('/api/users', usuariosRouter)).

   2) EL ROUTER decide (routes/users.routes.js)
      - usuariosRouter recibe el RESTO de la ruta: "/2".
      - Coincide con router.get('/:id', getUserById) (rutas relativas al montaje).
      - Llama al controlador getUserById, que es una función async.

   3) EL CONTROLADOR espera (controllers/users.controller.js)
      - getUserById es async y hace:
            const usuario = await usersService.getUserById(userId);
      - El await PAUSA el controlador hasta que la Promesa del servicio se
        resuelva o se rechace. Mientras, el event loop libera el hilo para
        atender otras peticiones (eso es lo "asincrónico": no bloquea el servidor).

   4) EL SERVICIO hace el "trabajo lento" (services/users.service.js)
      - getUserById es async: simula latencia con await delay(100) (como una
        consulta a base de datos) y luego busca en el array en memoria.
        - Si encuentra el usuario → lo retorna (resuelve la Promesa).
        - Si NO existe → lanza un Error con error.status = 404 (RECHAZA la
          Promesa).

   5) VUELTA AL CONTROLADOR
      - Caso feliz: la Promesa se resuelve → el await devuelve el usuario →
        el controlador responde con res.status(200).json(usuario). Fin.
      - Caso de error: la Promesa se rechaza → el await relanza → entra al
        catch → el controlador llama next(error).

   6) DERIVACIÓN AL errorHandler (middlewares/errorHandler.js)
      - next(error) salta todos los middlewares normales y va directo al
        errorHandler (identificado por tener 4 parámetros). Este respeta
        err.status (404) y devuelve una respuesta JSON limpia sin filtrar
        el stack trace al cliente. Por eso el errorHandler debe registrarse
        EL ÚLTIMO.

   7) RUTA INEXISTENTE → notFoundHandler
      - Si la petición no coincide con ninguna ruta (ej. /api/algo-raro),
        llega al notFoundHandler (registrado después de las rutas) y responde
        404. Por eso va antes que el errorHandler.

   ── ALTERNATIVA Express 5 (auto-catch) ──────────────────────────────────────
   En el paso 5, el try/catch del controlador se puede ELIMINAR: Express 5
   captura solo las Promesas rechazadas de un handler async y las deriva al
   errorHandler. El controlador quedaría solo con:
        const usuario = await usersService.getUserById(req.params.id);
        res.status(200).json(usuario);
   El router, el servicio, este index.js y el errorHandler NO cambian. Lo
   único que varía es el controlador (ver la documentación inline en cada
   controlador). Aquí se mantuvo el try/catch + next(err) por ser portable a
   Express 4 y dar control sobre el error antes de delegarlo.
   ════════════════════════════════════════════════════════════════════════════ */
