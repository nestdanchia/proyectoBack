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
/*
1. app.use(notFoundHandler). Como este middleware no tiene una ruta específica asignada (no dice /api ni nada previo), actúa como un embudo o red de seguridad que atrapa absolutamente todo lo que cayó hasta allí.
2. app.use(errorHandler). Como este también carece de ruta específica, 
atrapa cualquier error que haya ocurrido en los middlewares anteriores, 
inclusive en los routers.
*/
// Manejador de rutas no encontradas (404)
app.use(notFoundHandler);

// Manejador global de errores (500)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor API REST corriendo en http://localhost:${PORT}`);
});
/*
Cuando un cliente (como Postman o tu frontend) haga una petición a:
GET http://localhost:3000/api/users
1. El Servidor ve que la ruta empieza con /api/users y se la pasa a usuariosRouter.
2. El Enrutador recibe el resto de la ruta ("/") y ejecuta la función getUsers del controlador.
3. El Controlador le pide la lista a usersService.getAllUsers().
4. El Servicio retorna el array vacío [].
5. El Controlador responde al cliente con un estado 200 y el JSON []
• GET http://localhost:3000/api/users ➔ Montado en /api/users, el router recibe "/" y llega a getUsers.
• POST http://localhost:3000/api/users/register ➔ Montado en /api/users, el router recibe "/register" y llega a createNewUser.
• GET http://localhost:3000/api/products ➔ Montado en /api/products, el router recibe "/" y llega a getProducts.
• POST http://localhost:3000/api/products/register ➔ Montado en /api/products, el router recibe "/register" y llega a createNewProduct.
*/