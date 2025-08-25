import cuentaClienteRepository from '../repositories/cuenta_cliente_repository.js';

class CuentaClienteService {
	async crearCuentaCliente(datos) {
		// validar datos antes de crear la cuenta
        if (!datos.idCliente || !datos.tipo || !datos.monto || !datos.descripcion
            || (datos.tipo !== 'DEBITO' && datos.tipo !== 'CREDITO')) {
            throw new Error('idCliente, tipo (DEBITO o CREDITO), monto y descripcion son requeridos');
        }
        if (datos.monto <= 0) {
            throw new Error('monto debe ser un número positivo');
        }
        // validar tipo de datos
        if (typeof datos.idCliente !== 'number' || typeof datos.tipo !== 'string'
            || typeof datos.monto !== 'number' || typeof datos.descripcion !== 'string') {
            throw new Error('idCliente debe ser un número, tipo y descripcion deben ser cadenas de texto, monto debe ser un número');
        }
        // crear la cuenta
		return cuentaClienteRepository.crear(datos);
	}

	async obtenerTodos() {
		return cuentaClienteRepository.obtenerTodos();
	}

	async obtenerPorId(id) {
		return cuentaClienteRepository.obtenerPorId(id);
	}

	async actualizarCuentaCliente(id, datos) {
		return cuentaClienteRepository.actualizar(id, datos);
	}

	async eliminarCuentaCliente(id) {
		return cuentaClienteRepository.eliminar(id);
	}
}

export default new CuentaClienteService();
