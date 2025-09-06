
import cuentaClienteRepository from '../repositories/cuenta_cliente_repository.js';
import clienteRepository from '../repositories/cliente_repository.js';
import entregaRepository from '../repositories/entrega_repository.js';

class CuentaClienteService {
	async validarDatos(datos) {
		// Validar campos obligatorios
		const required = ['cliente_id', 'fecha', 'total_dia', 'pago', 'saldo_anterior', 'saldo_actual', 'entrega_id'];
		for (const campo of required) {
			if (datos[campo] === undefined || datos[campo] === null) {
				throw new Error(`${campo} es obligatorio`);
			}
		}
		// Validar tipos
		if (typeof datos.cliente_id !== 'number') throw new Error('cliente_id debe ser un número');
		if (typeof datos.entrega_id !== 'number') throw new Error('entrega_id debe ser un número');
		if (typeof datos.total_dia !== 'number') throw new Error('total_dia debe ser un número');
		if (typeof datos.pago !== 'number') throw new Error('pago debe ser un número');
		if (typeof datos.saldo_anterior !== 'number') throw new Error('saldo_anterior debe ser un número');
		if (typeof datos.saldo_actual !== 'number') throw new Error('saldo_actual debe ser un número');
		if (typeof datos.fecha !== 'string' && !(datos.fecha instanceof Date)) throw new Error('fecha debe ser string (YYYY-MM-DD) o Date');
		// Validar existencia de cliente
		const cliente = await clienteRepository.obtenerPorId(datos.cliente_id);
		if (!cliente) throw new Error('El cliente con el id proporcionado no existe');
		// Validar existencia de entrega
		const entrega = await entregaRepository.obtenerPorId(datos.entrega_id);
		if (!entrega) throw new Error('La entrega con el id proporcionado no existe');
		return true;
	}

	async crearCuentaCliente(datos) {
		await this.validarDatos(datos);
		return cuentaClienteRepository.crear(datos);
	}

	async obtenerTodos() {
		return cuentaClienteRepository.obtenerTodos();
	}

	async obtenerPorId(id) {
		return cuentaClienteRepository.obtenerPorId(id);
	}

	async actualizarCuentaCliente(id, datos) {
		const cuenta = await cuentaClienteRepository.obtenerPorId(id);
		if (!cuenta) return null;
		await this.validarDatos(datos);
		return cuentaClienteRepository.actualizar(id, datos);
	}

	async eliminarCuentaCliente(id) {
		const cuenta = await cuentaClienteRepository.obtenerPorId(id);
		if (!cuenta) return false;
		return cuentaClienteRepository.eliminar(id);
	}

	async obtenerPorClienteId(cliente_id) {
		return cuentaClienteRepository.obtenerPorClienteId(cliente_id);
	}
}

export default new CuentaClienteService();
