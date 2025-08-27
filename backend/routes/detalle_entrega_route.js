import express from 'express';
import DetalleEntregaService from '../services/detalle_entrega_service.js';

const router = express.Router();

// Crear un detalle de entrega
router.post('/', async (req, res) => {
    const { datos } = req.body;
    try {
        const nuevoDetalle = await DetalleEntregaService.crearDetalleEntrega(datos);
        if (!nuevoDetalle) {
            return res.status(400).json({ error: 'No se pudo crear el detalle de entrega' });
        }
        res.status(201).json({ message: 'Detalle de entrega creado correctamente', detalleEntrega: nuevoDetalle });
    } catch (error) {
        console.error('Error al crear el detalle de entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al crear el detalle de entrega!' });
    }
});

// Actualizar un detalle de entrega
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { datos } = req.body;
    try {
        const detalleActualizado = await DetalleEntregaService.actualizarDetalleEntrega(id, datos);
        if (!detalleActualizado) {
            return res.status(404).json({ error: 'Detalle de entrega no encontrado' });
        }
        res.status(200).json({ message: 'Detalle de entrega actualizado correctamente', detalleEntrega: detalleActualizado });
    } catch (error) {
        console.error('Error al actualizar el detalle de entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al actualizar el detalle de entrega' });
    }
});

// Eliminar un detalle de entrega
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await DetalleEntregaService.eliminarDetalleEntrega(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Detalle de entrega no encontrado' });
        }
        res.status(200).json({ message: 'Detalle de entrega eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el detalle de entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al eliminar el detalle de entrega' });
    }
});

// obtener todos los detalles de entrega
router.get('/', async (req, res) => {
    try {
        const detalles = await DetalleEntregaService.obtenerTodos();
        if (!detalles) {
            return res.status(404).json({ error: 'No se encontraron detalles de entrega' });
        }
        res.status(200).json({ detalles: detalles });
    } catch (error) {
        console.error('Error al obtener los detalles de entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los detalles de entrega' });
    }
});

// obtener un detalle de entrega por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await DetalleEntregaService.obtenerPorId(id);
        if (!detalle) {
            return res.status(404).json({ error: 'Detalle de entrega no encontrado' });
        }
        res.status(200).json({ detalle: detalle });
    } catch (error) {
        console.error('Error al obtener el detalle de entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener el detalle de entrega' });
    }
});

// obtener todos por entrega
router.get('/entrega/:id_entrega', async (req, res) => {
    const { id_entrega } = req.params;
    try {
        const detalles = await DetalleEntregaService.obtenerPorEntrega(id_entrega);
        if (!detalles) {
            return res.status(404).json({ error: 'No se encontraron detalles para la entrega especificada' });
        }
        res.status(200).json({ detalles: detalles });
    } catch (error) {
        console.error('Error al obtener los detalles de entrega por entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los detalles de entrega por entrega' });
    }
});

// eliminar todos por entrega
router.delete('/entrega/:id_entrega', async (req, res) => {
    const { id_entrega } = req.params;
    try {
        const eliminados = await DetalleEntregaService.eliminarPorEntrega(id_entrega);
        if (eliminados === 0) {
            return res.status(404).json({ error: 'No se encontraron detalles para eliminar en la entrega especificada' });
        }
        res.status(200).json({ message: 'Detalles de entrega eliminados correctamente' });
    } catch (error) {
        console.error('Error al eliminar los detalles de entrega por entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al eliminar los detalles de entrega por entrega' });
    }
});

export default router;
