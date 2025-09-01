import express from 'express';
import productoService from '../services/producto_service.js';

const router = express.Router();

// Obtener todos los Productos
router.get('/', async (req, res) => {
    try {
        const productos = await productoService.obtenerTodos();
        if (productos == null || productos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos' });
        }
        return res.status(200).json({ productos: productos });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los productos' });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const datos = req.body;
    console.log('Datos recibidos para crear producto:', datos);
    try {
        const producto = await productoService.crearProducto(datos);
        if (!producto) {
            return res.status(400).json({ error: 'No se pudo crear el producto' });
        }
        return res.status(201).json( { message: 'Producto creado correctamente', producto: producto });
    } catch (error) {
        console.error('Error al crear producto:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al crear el producto' });
    }
});

// Eliminar un producto 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await productoService.eliminarProducto(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al eliminar el producto' });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const productoActualizado = await productoService.actualizarProducto(id, datos);
        if (!productoActualizado) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json( { message: 'Producto actualizado correctamente', producto: productoActualizado });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al actualizar el producto' });
    }
});

// Buscar producto por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await productoService.obtenerPorId(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json({ producto: producto });
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener el producto por ID' });
    }
});

export default router;
