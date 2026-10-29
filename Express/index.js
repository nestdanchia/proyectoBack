import express from 'express';
import cors from 'cors'; // Esto sí te lo pide la Misión 2

const app = express();
const PORT = 3000;

// Middlewares necesarios para una API REST
app.use(cors());
app.use(express.json()); //LO TRANSFORMA A JS
// 1. CREAMOS UNA BASE DE DATOS TEMPORAL (Un array en memoria)
const usuariosRegistrados = [];

// 2. NUEVA RUTA GET: El navegador va a entrar acá para ver los usuarios
app.get('/users', (req, res) => {
    // Devolvemos el array con todos los usuarios en formato JSON
    res.json(usuariosRegistrados);
});

// Tus rutas lógicas (Acá es donde vas a responder con res.json() o res.send())
app.get('/api/productos', (req, res) => {
    res.json({ mensaje: "Acá van a viajar tus datos en formato JSON" });
});
// Cambiamos a app.post porque el cliente nos está ENVIANDO datos nuevos
app.post('/users/register', (req, res) => {
    // Capturamos los datos que viajan ocultos en el body
    const { name, email, password } = req.body;

    // Simulamos una validación rápida en el servidor
    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Faltan campos obligatorios",
            mensaje: "Por favor, completa name, email y password."
        });
    }
// Creamos el nuevo objeto de usuario
    const nuevoUsuario = {
        name: name,
        email: email,
        fechaRegistro: new Date()
    };
    usuariosRegistrados.push(nuevoUsuario);
    // Si todo está bien, respondemos con el estatus correcto de creación (201 Created)
    console.log(`Usuario registrado en consola: ${name} (${email})`);
    
    res.status(201).json({
        mensaje: "¡Usuario registrado con éxito en la API!",
            usuarioGuardado: nuevoUsuario
        
    });
});

// El ":id" es un marcador dinámico. Express va a aceptar cualquier cosa que pongan ahí.
app.get('/users/:id', (req, res) => {
    // Capturamos el valor dinámico que el cliente escribió en la URL
    const userId = req.params.id;

    // Respondemos con un JSON mostrando qué ID capturó el servidor
    res.json({
        mensaje: "Petición GET recibida con parámetro de ruta",
        usuarioBuscadoId: userId,
        urlSimulada: `/users/${userId}`
    });
});
// CONTROLADOR DE ERROR 404 (Va abajo de todas tus otras rutas)
app.use((req, res, next) => {
    res.status(404).json({
        error: 404,
        mensaje: "Recurso no encontrado o ruta inválida en este servidor.",
        rutaIntentada: req.url
    });
});


app.listen(PORT, () => {
    console.log(`Servidor API REST corriendo en http://localhost:${PORT}`);
});
