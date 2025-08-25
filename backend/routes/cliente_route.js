import express from 'express';
import clienteService from '../services/cliente_service.js';

const router = express.Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await clienteService.obtenerTodos();
        if (clientes == null || clientes.length === 0) {
            return res.status(404).json({ error: 'No se encontraron clientes' });
        }
        return res.status(200).json({ clientes: clientes });
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los clientes' });
    }
});

// Crear un nuevo cliente
router.post('/', async (req, res) => {
    try {
        const cliente = await clienteService.crearCliente(req.body);
        if (!cliente) {
            return res.status(400).json({ error: 'No se pudo crear el cliente' });
        }
        return res.status(201).json({ message: 'Cliente creado correctamente', cliente: cliente });
    } catch (error) {
        console.error('Error al crear cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al crear el cliente' });
    }
});

// Borrar el cliente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await clienteService.eliminarCliente(id);
        if (!eliminado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        return res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al eliminar el cliente' });
    }
});

// Actualizar un cliente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const datos = req.body;
    try {
        const clienteActualizado = await clienteService.actualizarCliente(id, datos);
        if (!clienteActualizado) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        return res.status(200).json({ message: 'Cliente actualizado correctamente', cliente: clienteActualizado });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al actualizar el cliente' });
    }
});

// Buscar clientes por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await clienteService.obtenerPorId(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        return res.status(200).json({ cliente: cliente });
    } catch (error) {
        console.error('Error al obtener cliente por ID:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener el cliente' });
    }   
});

export default router;
