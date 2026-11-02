// Base de datos temporal simulada en memoria
const productosRegistrados = [];

export const getAllProducts = () => {
    return productosRegistrados;
};

export const registerProduct = (name, price) => {
    const nuevoProducto = {
        id: productosRegistrados.length + 1,
        name,
        price,
        fechaRegistro: new Date()
    };
    productosRegistrados.push(nuevoProducto);
    return nuevoProducto;
};
