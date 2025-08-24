import CuentaClienteRepository from '../repositories/cuenta_cliente_repository.js';
import cliente_service from './cliente_service.js';

class CuentaClienteService {
    async obtenerCuentasPorCliente(idCliente) {
        try {
            const cuentas = await CuentaClienteRepository.obtenerPorCliente(idCliente);
            if (!cuentas || cuentas.length === 0) {
                throw new Error('No se encontraron cuentas para el cliente especificado');
            }
            return cuentas;
        } catch (error) {
            console.error('Error al obtener cuentas del cliente:', error);
            throw new Error(error.message || 'Error al obtener las cuentas del cliente');
        }  
    }

    async crearCuenta(idCliente, datosCuenta) {
        // Validar datos antes de crear la cuenta
        if (!datosCuenta.saldo || !datosCuenta.fecha || !idCliente) {
            throw new Error('Saldo, fecha y cliente son requeridos');
        }
        // Validar tipo de datos
        if (typeof datosCuenta.saldo !== 'number' || isNaN(datosCuenta.saldo)) {
            throw new Error('Saldo debe ser un número válido');
        }
        if (isNaN(Date.parse(datosCuenta.fecha))) {
            throw new Error('Fecha debe ser una fecha válida');
        }
        if (typeof idCliente !== 'number' || isNaN(idCliente)) {
            throw new Error('ID de cliente debe ser un número válido');
        }
        // validar cliente
        const cliente = await cliente_service.obtenerPorId(idCliente);
        if (!cliente) {
            throw new Error('El cliente especificado no existe');
        }
        // Crear la cuenta
        return CuentaClienteRepository.crear({
            idCliente: idCliente,
            saldo: datosCuenta.saldo,
            fecha: new Date(datosCuenta.fecha),
        });
    }

    async eliminarCuenta(idCliente, idCuenta) {
        // Verificar datos 
        if (!idCliente || !idCuenta) {
            throw new Error('ID de cliente y ID de cuenta son requeridos');
        }
        // Validar tipo de datos
        if (typeof idCliente !== 'number' || isNaN(idCliente) || typeof idCuenta !== 'number' || isNaN(idCuenta)) {
            throw new Error('ID de cliente y ID de cuenta deben ser números válidos');
        }
        // Validar que el cliente existe
        const cliente = await cliente_service.obtenerPorId(idCliente);
        if (!cliente) {
            throw new Error('El cliente especificado no existe');
        }
        // Verificar si la cuenta pertenece al cliente
        const cuentaExiste = await CuentaClienteRepository.existeCuentaCliente(idCliente, idCuenta);
        if (!cuentaExiste) {
            throw new Error('La cuenta especificada no pertenece al cliente o no existe');
        }
        // Eliminar la cuenta
        return CuentaClienteRepository.eliminar(idCuenta);
    }

    async actualizarCuenta(idCliente, idCuenta, datos) {
        // Verificar datos 
        if (!idCliente || !idCuenta || datos.saldo || datos.fecha) {
            throw new Error('ID de cliente, ID de cuenta, saldo y fecha son requeridos');
        }
        // Validar tipo de datos
        if (typeof idCliente !== 'number' || isNaN(idCliente) || typeof idCuenta !== 'number' || isNaN(idCuenta)) {
            throw new Error('ID de cliente y ID de cuenta deben ser números válidos');
        }
        if (typeof datosCuenta.saldo !== 'number' || isNaN(datosCuenta.saldo)) {
            throw new Error('Saldo debe ser un número válido');
        }
        if (isNaN(Date.parse(datosCuenta.fecha))) {
            throw new Error('Fecha debe ser una fecha válida');
        }
        // Validar que el cliente existe
        const cliente = await cliente_service.obtenerPorId(idCliente);
        if (!cliente) {
            throw new Error('El cliente especificado no existe');
        }
        // Verificar si la cuenta pertenece al cliente
        const cuentaExiste = await CuentaClienteRepository.existeCuentaCliente(idCliente, idCuenta);
        if (!cuentaExiste) {
            throw new Error('La cuenta especificada no pertenece al cliente o no existe');
        }
        // Actualizar cuenta
        return CuentaClienteRepository.actualizar(idCuenta, datos)
    }
}

export default new CuentaClienteService();
