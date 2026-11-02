import * as productsService from '../services/products.service.js';

export const getProducts = (req, res) => {
    const productos = productsService.getAllProducts();
    res.status(200).json(productos);
};

export const createNewProduct = (req, res) => {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({
            error: "Faltan campos obligatorios",
            mensaje: "Por favor, completa name y price."
        });
    }

    const productoGuardado = productsService.registerProduct(name, price);

    res.status(201).json({
        mensaje: "¡Producto registrado con éxito en la API!",
        productoGuardado
    });
};
