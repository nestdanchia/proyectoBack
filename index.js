import http from 'node:http'
const PORT = 2000;

http.createServer((req, res) => {
// Código de estado HTTP
res.statusCode = 200;
// Configuramos el tipo de contenido
res.setHeader('Content-Type', 'text/plain',' charset=utf-8');
// Enviamos la respuesta
res.end('Hola, mundo!');
}).listen(PORT, () => console.log(`Server running on port ${PORT}`))