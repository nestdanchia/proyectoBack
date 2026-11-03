import * as productsService from '../services/products.service.js';

// ─────────────────────────────────────────────────────────────────────────────
// Controladores asincrónicos: misma estrategia que users.controller.js:
// try/catch + next(err) → errorHandler centralizado.
//
// ALTERNATIVA Express 5: quitar el try/catch y dejar que Express derive solo
// las Promesas rechazadas al errorHandler. Cada handler de abajo lleva un
// comentario "Alternativa Express 5" mostrando cómo quedaría. La explicación
// completa está en users.controller.js. (El errorHandler NO cambia.)
// ─────────────────────────────────────────────────────────────────────────────
export const getProducts = async (req, res, next) => {
    try {
        const productos = await productsService.getAllProducts();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
    // ── Alternativa Express 5 (sin try/catch ni next) ──────────────────────────
    //   const productos = await productsService.getAllProducts();
    //   res.status(200).json(productos);
    //
    // Si getAllProducts() rechaza, Express 5 lo deriva solo al errorHandler.
};

export const createNewProduct = async (req, res, next) => {
    try {
        const { name, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({
                error: 'Faltan campos obligatorios',
                mensaje: 'Por favor, completa name y price.'
            });
        }

        const productoGuardado = await productsService.registerProduct(name, price);

        res.status(201).json({
            mensaje: '¡Producto registrado con éxito en la API!',
            productoGuardado
        });
    } catch (error) {
        next(error);
    }
    // ── Alternativa Express 5 (sin try/catch) ──────────────────────────────────
    // La validación 400 se mantiene igual (responde directo); solo se quita el
    // try/catch que envuelve al await:
    //
    //   const { name, price } = req.body;
    //   if (!name || price === undefined) { return res.status(400).json({ ... }); }
    //   const productoGuardado = await productsService.registerProduct(name, price);
    //   res.status(201).json({ ... });
    //
    // Si registerProduct() rechaza, Express 5 lo deriva solo al errorHandler.
};
