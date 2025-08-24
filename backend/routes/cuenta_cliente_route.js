import express from 'express';
import CuentaClienteService from '../services/cuenta_cliente_service.js';

const router = express.Router();

// Obtener cuentas por cliente
router.get('/:idCliente', async (req, res) => {
    const { idCliente } = req.params;
    try {
        const cuentas = await CuentaClienteService.obtenerCuentasPorCliente(idCliente);
        return res.status(200).json(cuentas);
    } catch (error) {
        console.error('Error al obtener cuentas del cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al obtener las cuentas del cliente' });
    }
});

// Crear una nueva cuenta para un cliente
router.post('/:idCliente', async (req, res) => {
    const { idCliente } = req.params;
    const datosCuenta = req.body;
    try {
        const cuentaCreada = await CuentaClienteService.crearCuenta(idCliente, datosCuenta);
        return res.status(201).json(cuentaCreada);
    } catch (error) {
        console.error('Error al crear cuenta del cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al crear la cuenta del cliente' });
    }   
});

// Eliminar una cuenta del cliente
router.delete('/:idCliente/:idCuenta', async (req, res) => {
    const { idCliente, idCuenta } = req.params;
    try {
        const cuentaEliminada = await CuentaClienteService.eliminarCuenta(idCliente, idCuenta);
        if (cuentaEliminada) {
            return res.status(200).json({ message: 'Cuenta eliminada correctamente' });
        }
        return res.status(404).json({ error: 'Cuenta no encontrada' });
    } catch (error) {
        console.error('Error al eliminar cuenta del cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al eliminar la cuenta del cliente' });
    }
});

// Actualizar/Modificar una cuenta de un cliente
router.put('/:idCLiente/:idCuenta', async (req, res) => {
    const { idCliente, idCuenta} = req.params;
    const datos = req.body;
    try {
        const cuentaActualizada = await CuentaClienteService.actualizarCuenta(idCliente, idCuenta, datos);
        if (cuentaActualizada) {
            return res.status(/* CODIGO DE ACTUALIZACION*/).json({ message: 'Cuenta actualizada correctamente' });
        }
        return res.status(404).json({ error: 'Cuenta no encontrada' });
    } catch (error) {
        console.error('Error al actualizar cuenta del cliente:', error);
        const statusCode = error.status || 500;
        return res.status(statusCode).json({ error: error.message || 'Error al actualizar la cuenta del cliente' });
    }
})

export default router;
