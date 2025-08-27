import express from 'express';
import entregaService from '../services/entrega_service.js';

const router = express.Router();

// Nueva entrega
router.post('/', async (req, res) => {
    const { datos } = req.body;
    try {
        const entrega = await entregaService.crearEntrega(datos);
        if (!entrega) {
            return res.status(400).json({ error: 'No se pudo crear la entrega' });
        }
        return res.status(201).json({ message: 'Entrega creada correctamente', entrega: entrega });
    } catch (error) {
        console.error('Error al crear entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al crear la entrega' });
    }
});

// Actualizar entrega
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { datos } = req.body;
    try {
        const entregaActualizada = await entregaService.actualizarEntrega(id, datos);
        if (!entregaActualizada) {
            return res.status(404).json({ error: 'Entrega no encontrada' });
        }
        return res.status(200).json({ message: 'Entrega actualizada correctamente', entrega: entregaActualizada });
    } catch (error) {
        console.error('Error al actualizar entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al actualizar la entrega' });
    }
});

// Eliminar Entrega
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await entregaService.eliminarEntrega(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Entrega no encontrada' });
        }
        return res.status(200).json({ message: 'Entrega eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al eliminar la entrega' });
    }
});

// Obtener todas las entregas
router.get('/', async (req, res) => {
    try {
        const entregas = await entregaService.obtenerTodas();
        if (entregas == null || entregas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron entregas' });
        }
        return res.status(200).json({ entregas: entregas });
    } catch (error) {
        console.error('Error al obtener las entregas:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener las entregas' });
    }
});

// Obtener entrega por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const entrega = await entregaService.obtenerPorId(id);
        if (!entrega) {
            return res.status(404).json({ error: 'Entrega no encontrada' });
        }
        return res.status(200).json({ entrega: entrega });
    } catch (error) {
        console.error('Error al obtener la entrega:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener la entrega' });
    }
});

// obtener entregas por id_cliente
router.get('/cliente/:id_cliente', async (req, res) => {
    const { id_cliente } = req.params;
    try {
        const entregas = await entregaService.obtenerPorCliente(id_cliente);
        if (entregas == null || entregas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron entregas para el cliente proporcionado' });
        }
        return res.status(200).json({ entregas: entregas });
    } catch (error) {
        console.error('Error al obtener las entregas del cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener las entregas del cliente' });
    }
});

export default router;  
