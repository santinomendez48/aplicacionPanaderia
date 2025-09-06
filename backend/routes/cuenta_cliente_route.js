import express from 'express';
import cuentaClienteService from '../services/cuenta_cliente_service.js';


const router = express.Router();


// Crear cuenta diaria
router.post('/', async (req, res) => {
	const datos = req.body;
	try {
		const cuenta = await cuentaClienteService.crearCuentaCliente(datos);
		if (!cuenta) {
			return res.status(400).json({ error: 'No se pudo crear la cuenta diaria' });
		}
		return res.status(201).json({ message: 'Cuenta diaria creada correctamente', cuenta });
	} catch (error) {
		console.error('Error al crear la cuenta diaria:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al crear la cuenta diaria' });
	}
});

// Obtener todas las cuentas diarias
router.get('/', async (req, res) => {
	try {
		const cuentas = await cuentaClienteService.obtenerTodos();
		if (!cuentas || cuentas.length === 0) {
			return res.status(404).json({ error: 'No se encontraron cuentas diarias' });
		}
		return res.status(200).json({ cuentas });
	} catch (error) {
		console.error('Error al obtener las cuentas diarias:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al obtener las cuentas diarias' });
	}
});

// Obtener cuenta diaria por id
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const cuenta = await cuentaClienteService.obtenerPorId(Number(id));
		if (!cuenta) {
			return res.status(404).json({ error: 'Cuenta diaria no encontrada' });
		}
		return res.status(200).json({ cuenta });
	} catch (error) {
		console.error('Error al obtener la cuenta diaria:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al obtener la cuenta diaria' });
	}
});

// Actualizar cuenta diaria
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const datos = req.body;
	try {
		const actualizado = await cuentaClienteService.actualizarCuentaCliente(Number(id), datos);
		if (!actualizado) {
			return res.status(404).json({ error: 'Cuenta diaria no encontrada' });
		}
		return res.status(200).json({ message: 'Cuenta diaria actualizada correctamente', cuenta: actualizado });
	} catch (error) {
		console.error('Error al actualizar la cuenta diaria:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al actualizar la cuenta diaria' });
	}
});

// Eliminar cuenta diaria
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const eliminado = await cuentaClienteService.eliminarCuentaCliente(Number(id));
		if (!eliminado) {
			return res.status(404).json({ error: 'Cuenta diaria no encontrada' });
		}
		return res.status(200).json({ message: 'Cuenta diaria eliminada correctamente' });
	} catch (error) {
		console.error('Error al eliminar la cuenta diaria:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al eliminar la cuenta diaria' });
	}
});

// Obtener cuentas diarias por cliente
router.get('/cliente/:cliente_id', async (req, res) => {
	const { cliente_id } = req.params;
	try {
		const cuentas = await cuentaClienteService.obtenerPorClienteId(Number(cliente_id));
		if (!cuentas || cuentas.length === 0) {
			return res.status(404).json({ error: 'No se encontraron cuentas diarias para el cliente especificado' });
		}
		return res.status(200).json({ cuentas });
	} catch (error) {
		console.error('Error al obtener las cuentas diarias por cliente:', error);
		const statusCode = error.status || 500;
		return res.status(statusCode).json({ error: error.message || 'Error al obtener las cuentas diarias por cliente' });
	}
});

export default router;
