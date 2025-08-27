import cuentaClienteRepository from '../repositories/cuenta_cliente_repository.js';
import clienteRepository from '../repositories/cliente_repository.js';

class CuentaClienteService {
	async validarDatos(datos) {
		// validar datos obligatorios
        if (!datos.id_cliente || !datos.tipo_movimiento || !datos.monto || !datos.descripcion || !datos.fecha ) {
            throw new Error('idCliente, tipo (DEBITO o CREDITO), monto, descripcion y fecha son obligatorios');
        }
		if (datos.tipo !== 'DEBITO' && datos.tipo !== 'CREDITO') {
			throw new Error('El tipo de movimiento debe ser DEBITO o CREDITO');
		}
		// validar fecha
		if (datos.fecha && isNaN(Date.parse(datos.fecha))) {
			throw new Error('La fecha proporcionada no es válida');
		}
		// validar observaciones
		if (datos.observaciones && typeof datos.observaciones !== 'string') {
			throw new Error('observaciones debe ser una cadena de texto');
		}
        // validar tipo de datos
        if (typeof datos.id_cliente !== 'number' || typeof datos.tipo_movimiento !== 'string'
            || typeof datos.monto !== 'number' || typeof datos.descripcion !== 'string') {
            throw new Error('idCliente debe ser un número, tipo y descripcion deben ser cadenas de texto, monto debe ser un número');
        }
		if (datos.monto <= 0) {
            throw new Error('monto debe ser un número positivo');
        }
		// validar existencia del cliente
		const cliente = await clienteService.obtenerPorId(datos.id_cliente);
		if (!cliente) {
			throw new Error('El cliente con el id proporcionado no existe');
		}
		return true;
	}

	async crearMovimientoCuentaCliente(datos) {
		// validar datos antes de crear el movimiento
		await this.validarDatos(datos);
        // crear el movimiento
		return cuentaClienteRepository.crear(datos);
	}

	async obtenerTodos() {
		return cuentaClienteRepository.obtenerTodos();
	}

	async obtenerPorId(id) {
		return cuentaClienteRepository.obtenerPorId(id);
	}

	async actualizarMovimientoCuentaCliente(id, datos) {
		// validar existencia del movimiento
		const movimiento = await cuentaClienteRepository.obtenerPorId(id);
		if (!movimiento) {
			return null;
		}
		// validar datos antes de actualizar 
		await this.validarDatos(datos);
		// actualizar el movimiento
		return cuentaClienteRepository.actualizar(id, datos);
	}

	async eliminarCuentaCliente(id) {
		// validar existencia del movimiento
		const movimiento = await cuentaClienteRepository.obtenerPorId(id);
		if (!movimiento) {
			return false;
		}
		return cuentaClienteRepository.eliminar(id);
	}
}

export default new CuentaClienteService();
