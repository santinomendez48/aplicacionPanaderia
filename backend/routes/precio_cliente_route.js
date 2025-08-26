import express from 'express';
import precioClienteService from '../services/precio_cliente_service.js';

const router = express.Router();

// Crear un precio especial para cliente
router.post('/', async (req, res) => {
    const { datos } = req.body;
    try {
        const precioCliente = await precioClienteService.crearPrecioCliente(datos);
        if (!precioCliente) {
            return res.status(400).json({ error: 'No se pudo crear el precio especial para el cliente' });
        }
        return res.status(201).json({ message: 'Precio especial para cliente creado correctamente', precioCliente: precioCliente });
    } catch (error) {
        console.error('Error al crear el Precio Especial para Cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al crear el Precio Especial para Cliente' });
    }
});

// Obtener todos los precios especiales para todos los clientes
router.get('/', async (req, res) => {
    try {
        const preciosCliente = await precioClienteService.obtenerTodos();
        if (preciosCliente == null || preciosCliente.length === 0) {
            return res.status(404).json({ error: 'No se encontraron precios especiales para clientes' });
        }
        return res.status(200).json({ preciosCliente: preciosCliente });
    } catch (error) {
        console.error('Error al obtener los Precios Especiales para Clientes:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los Precios Especiales para Clientes' });
    }
});

// Obtener precio especial por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const precioCliente = await precioClienteService.obtenerPorId(id);
        if (!precioCliente) {
            return res.status(404).json({ error: 'Precio especial para cliente no encontrado' });
        }
        return res.status(200).json({ precioCliente: precioCliente });
    } catch (error) {
        console.error('Error al obtener el Precio Especial para Cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener el Precio Especial para Cliente' });
    }
});

// Obtener precios especiales por id_cliente
router.get('/cliente/:id_cliente', async (req, res) => {
    const { id_cliente } = req.params;
    try {
        const preciosCliente = await precioClienteService.obtenerPorCliente(id_cliente);
        if (preciosCliente == null || preciosCliente.length === 0) {
            return res.status(404).json({ error: 'No se encontraron precios especiales para este cliente' });
        }
        return res.status(200).json({ preciosCliente: preciosCliente });
    } catch (error) {
        console.error('Error al obtener los Precios Especiales para el Cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los Precios Especiales para el Cliente' });
    }
});

// Obtener precios especiales por id_producto
router.get('/producto/:id_producto', async (req, res) => {
    const { id_producto } = req.params;
    try {
        const preciosPorProducto = await precioClienteService.obtenerPorProducto(id_producto);
        if (preciosPorProducto == null || preciosPorProducto.length === 0) {
            return res.status(404).json({ error: 'No se encontraron precios especiales para este producto' });
        }
        return res.status(200).json({ preciosPorProducto: preciosPorProducto });
    } catch (error) {
        console.error('Error al obtener los Precios Especiales para el Producto:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los Precios Especiales para el Producto' });
    }
});

// Obtener precios especiales por id_producto e id_cliente
router.get('/producto/:id_producto/cliente/:id_cliente', async (req, res) => {
    const { id_producto, id_cliente } = req.params;
    try {
        const preciosPorProductoYCliente = await precioClienteService.obtenerPorProductoCliente(id_producto, id_cliente);
        if (preciosPorProductoYCliente == null || preciosPorProductoYCliente.length === 0) {
            return res.status(404).json({ error: 'No se encontraron precios especiales para este producto y cliente' });
        }
        return res.status(200).json({ preciosPorProductoYCliente: preciosPorProductoYCliente });
    } catch (error) {
        console.error('Error al obtener los Precios Especiales para el Producto y Cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los Precios Especiales para el Producto y Cliente' });
    }
});

// Actualizar precio especial de un producto para un cliente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { datos } = req.body;
    try {
        const precioClienteActualizado = await precioClienteService.actualizarPrecioCliente(id, datos);
        if (!precioClienteActualizado) {
            return res.status(404).json({ error: 'Precio especial para cliente no encontrado' });
        }
        return res.status(200).json({ message: 'Precio especial para cliente actualizado correctamente', precioCliente: precioClienteActualizado });
    } catch (error) {
        console.error('Error al actualizar el Precio Especial para Cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al actualizar el Precio Especial para Cliente' });
    }
});

// Eliminar precio especial de un producto para un cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await precioClienteService.eliminarPrecioCliente(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Precio especial para cliente no encontrado' });
        }
        return res.status(200).json({ message: 'Precio especial para cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el Precio Especial para Cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al eliminar el Precio Especial para Cliente' });
    }
});

export default router;
