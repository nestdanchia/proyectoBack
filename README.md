# 🚀 Repaso de Backend: Node.js Nativo vs. Express JS

Este repositorio contiene las prácticas y misiones de backend desarrolladas para el curso **Talento Tech (Buenos Aires Aprende)**. Aquí se consolidan los conceptos clave de las Clases 9, 10 y 11 sobre arquitectura de APIs REST, enrutamiento dinámico y manejo de módulos modernos.

---

## ⚙️ 1. Configuración Inicial del Entorno

Para iniciar cualquier proyecto backend desde cero utilizando el estándar moderno de JavaScript, los pasos secuenciales son:

1. **Inicializar el proyecto:**  
   `npm init -y` (Genera el archivo `package.json` base).
2. **Habilitar Módulos ES (ESM):**  
   Agregar `"type": "module"` en el `package.json` para poder usar las instrucciones `import` y `export` en lugar del antiguo `require()`.
3. **Definir el script de arranque:**  
   Configurar `"start": "node index.js"` dentro del objeto `"scripts"`.
4. **Instalar Express:**  
   `npm install express` (Descarga el framework en la carpeta local `node_modules`).
5. **Configurar Git de forma segura:**  
   Crear un archivo `.gitignore` en la raíz y agregar `node_modules/` arriba de todo para evitar rastrear archivos pesados de librerías.

---

## 🔄 2. El Flujo de una API REST: Arquitectura de Capas

A diferencia de los servidores tradicionales que sirven páginas web estáticas (HTML/CSS), una **API REST** prescinde de la capa de vistas y se comunica intercambiando datos puros en formato **JSON**. El flujo de responsabilidades se divide en:

```text
Cliente (Postman) ──> Middlewares ──> Rutas (Endpoints) ──> Controlador/Lógica ──> Datos (Array/JSON)
```

### 🧠 Conceptos Clave del Servidor:
* **`app.use(cors())`**: Middleware que habilita el control de acceso de origen cruzado, permitiendo que navegadores desde otros dominios consulten la API de forma segura.
* **`app.use(express.json())`**: El "traductor". Intercepta las peticiones, procesa el texto plano en formato JSON entrante y lo transforma en un objeto JS accesible mediante `req.body`.
* **`next`**: Función que actúa como un silbato para indicarle a Express que el middleware actual terminó su lógica y la petición puede avanzar al siguiente bloque de control.

---

## 🛣️ 3. Métodos HTTP y Manejo de Parámetros

El servidor escucha una combinación de **Ruta (Path)** y **Método HTTP** para decidir qué acción ejecutar. Un mismo path (ej: `/users`) puede comportarse de maneras totalmente distintas:

### 📥 Método GET (Obtener recursos)
Se usa para pedir información al servidor. El navegador lo ejecuta por defecto al escribir una URL.
* **Path Params (`req.params`)**: Parámetros obligatorios en la URL marcados con dos puntos (ej: `/users/:id`). Sirven para identificar un recurso único (ej: `/users/542`).
* **Query Params (`req.query`)**: Parámetros opcionales que viajan al final de la URL separados por un signo de pregunta (ej: `/buscar?categoria=computacion`). Se usan para filtrar o buscar.

### 📤 Método POST (Crear recursos)
Se usa para enviar información nueva y sensible hacia el servidor. Los datos viajan ocultos dentro del cuerpo de la petición (**`req.body`**). Se prueba de forma profesional utilizando herramientas como **Postman**.

---

## 🛡️ 4. Control de Errores Robustos (Middleware 404)

Para evitar que el servidor devuelva textos planos feos por defecto (*Cannot GET*), se posiciona un middleware global **al final de todas las rutas**:

```javascript
app.use((req, res, next) => {
    res.status(404).json({
        error: 404,
        mensaje: "Recurso no encontrado o ruta inválida."
    });
});
```
Si una petición no coincide con ninguna ruta programada, cae en este bloque, el cual frena el flujo y responde con un código de estado `404 Not Found` estructurado de manera profesional.

---

## 🧪 5. Cómo Probar la API de forma Profesional

Dado que los navegadores web tradicionales solo pueden realizar peticiones `GET` directamente desde la barra de direcciones, utilizamos herramientas de testeo para simular todo el espectro de una API REST.

### 🦊 Opción A: Usando la Aplicación Postman

Postman actúa como un espejo: recibe los paquetes de texto que fabrica tu servidor (JSON y Códigos de Estado) y los muestra de forma ordenada en pantalla.

#### 1. Probar una petición GET (Con parámetros)
1. Abrir una pestaña nueva con el botón `+`.
2. Asegurarse de que el método desplegable izquierdo diga **`GET`**.
3. Ingresar la URL dinámica en la barra, por ejemplo: `http://localhost:3000/users/542`.
4. Presionar el botón azul **`Send`**.
5. Abajo, en la pestaña **`Body -> Pretty`**, el servidor te mostrará el JSON con el ID `542` capturado de la URL.

#### 2. Probar una petición POST (Enviar datos al Body)
1. Cambiar el método desplegable de `GET` a **`POST`**.
2. Escribir la URL de registro: `http://localhost:3000/users/register`.
3. Ir a la pestaña **`Body`** (ubicada justo debajo de la barra de direcciones).
4. Seleccionar la opción **`raw`** y, en el desplegable de la derecha, cambiar `Text` por **`JSON`**.
5. Escribir el objeto con las llaves y comillas dobles estrictas:
   ```json
   {
     "name": "Tu Nombre",
     "email": "test@correo.com",
     "password": "123"
   }
   ```
6. Presionar **`Send`**. Verás el estado **`Status: 201 Created`** y la respuesta de confirmación de tu servidor.

---

### ⚡ Opción B: Usando la Extensión dentro de VS Code (Thunder Client / Postman)

Si instalaste la extensión directamente en Visual Studio Code para no abrir programas externos, el flujo es exactamente el mismo pero integrado en tu editor:

1. Hacer clic en el ícono de la extensión en la barra lateral izquierda (el rayo violeta de **Thunder Client** o el logo de **Postman**).
2. Tocar en **`New Request`** (Nueva Petición).
3. **Para GET:** Escribís la URL, elegís `GET` y le das a **Send**. El JSON aparecerá en el panel de la derecha.
4. **Para POST:** Cambiás a `POST`, vas a la pestaña **`Body`** que está abajo, elegís **`JSON`** y pegás tu objeto de pruebas antes de enviar.

*Tip:* La ventaja de la extensión es que te permite ver la terminal de Node.js abajo y los resultados del testeo al costado en una sola pantalla.
