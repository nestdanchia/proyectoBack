// Base de datos temporal simulada en memoria
const productosRegistrados = [];

// Simula la latencia de una operación de I/O real (ej. consulta a BD)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllProducts = async () => {
    await delay(100);
    return productosRegistrados;
};

export const registerProduct = async (name, price) => {
    await delay(100);
    const nuevoProducto = {
        id: productosRegistrados.length + 1,
        name,
        price,
        fechaRegistro: new Date()
    };
    productosRegistrados.push(nuevoProducto);
    return nuevoProducto;
};
