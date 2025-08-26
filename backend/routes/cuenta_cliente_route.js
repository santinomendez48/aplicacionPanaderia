import express from 'express';
import cuentaClienteService from '../services/cuenta_cliente_service.js';


const router = express.Router();

// Crear movimiento
router.post('/', async (req, res) => {
    const { datos } = req.body;
	try {
		const movimiento = await cuentaClienteService.crearMovimientoCuentaCliente(datos);
        if (!movimiento) {
            return res.status(400).json({ error: 'No se pudo crear el movimiento' });
        }
		return res.status(201).json({ message: 'Movimiento creado correctamente', movimiento: movimiento });
	} catch (error) {
        console.error('Error al crear el Movimiento:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al crear el Movimiento' });
	}
});

// Obtener todas los Movimientos
router.get('/', async (req, res) => {
	try {
		const movimientos = await cuentaClienteService.obtenerTodos();
		if (cuentas == null || cuentas.length === 0) {
			return res.status(404).json({ error: 'No se encontraron movimientos' });
		}
		return res.status(200).json({ movimientos: movimientos });
	} catch (error) {
		console.error('Error al obtener los Movimientos:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener los Movimientos' });
	}
});

// Obtener Movimiento por id
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const movimiento = await cuentaClienteService.obtenerPorId(id);
		if (!movimiento) {
			return res.status(404).json({ error: 'Movimiento no encontrado' });
		}
		return res.status(200).json({ movimiento: movimiento });
	} catch (error) {
		console.error('Error al obtener el Movimiento:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al obtener el Movimiento' });
	}
});

// Actualizar movimiento
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { datos } = req.body;
	try {
		const actualizado = await cuentaClienteService.actualizarMovimientoCuentaCliente(id, datos);
		if (!actualizado) {
			return res.status(404).json({ error: 'Movimiento no encontrado' });
		}
		return res.status(200).json({ message: 'Movimiento actualizado correctamente', movimeinto: actualizado });
	} catch (error) {
		console.error('Error al actualizar el Movimiento:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al actualizar el Movimiento' });
	}
});

// Eliminar movimiento
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const eliminado = await cuentaClienteService.eliminarCuentaCliente(id);
		if (!eliminado) {
			return res.status(404).json({ error: 'Movimiento no encontrado' });
		}
		return res.status(200).json({ message: 'Movimiento eliminado correctamente' });
	} catch (error) {
		console.error('Error al eliminar el Movimiento:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al eliminar el Movimiento' });
	}
});

export default router;
