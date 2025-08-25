
import express from 'express';
import cuentaClienteService from '../services/cuenta_cliente_service.js';


const router = express.Router();

// Crear Cuenta
router.post('/', async (req, res) => {
    const { datos } = req.body;
	try {
		const cuenta = await cuentaClienteService.crearCuentaCliente(datos);
        if (!cuenta) {
            return res.status(400).json({ error: 'No se pudo crear la cuenta' });
        }
		return res.status(201).json({ message: 'Cuenta creada correctamente', cuenta: cuenta });
	} catch (error) {
        console.error('Error al crear la Cuenta:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al crear la Cuenta' });
	}
});

// Obtener todas las Cuentas
router.get('/', async (req, res) => {
	try {
		const cuentas = await cuentaClienteService.obtenerTodos();
		return res.status(200).json({ cuentas: cuentas });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Obtener movimiento por id
router.get('/:id', async (req, res) => {
	try {
		const movimiento = await cuentaClienteService.obtenerPorId(req.params.id);
		if (!movimiento) return res.status(404).json({ error: 'Movimiento no encontrado' });
		return res.status(200).json({ movimiento });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Actualizar movimiento
router.put('/:id', async (req, res) => {
	try {
		const actualizado = await cuentaClienteService.actualizarCuentaCliente(req.params.id, req.body);
		if (!actualizado) return res.status(404).json({ error: 'Movimiento no encontrado' });
		return res.status(200).json({ message: 'Movimiento actualizado correctamente', actualizado });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
});

// Eliminar movimiento
router.delete('/:id', async (req, res) => {
	try {
		const eliminado = await cuentaClienteService.eliminarCuentaCliente(req.params.id);
		if (!eliminado) return res.status(404).json({ error: 'Movimiento no encontrado' });
		return res.status(200).json({ message: 'Movimiento eliminado correctamente' });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});


export default router;
