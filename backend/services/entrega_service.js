import EntregaRepository from '../repositories/entrega_repository.js';
import clienteRepository from '../repositories/cliente_repository.js';

class EntregaService {
    async validarDatos(datos) {
        // validar datos
        if (!datos.id_cliente || !datos.fecha_entrega) {
            throw new Error('id_cliente y fecha_entrega son obligatorios');
        }
        // validar tipo de datos
        if (typeof datos.id_cliente !== 'number' || isNaN(Date.parse(datos.fecha_entrega))) {
            throw new Error('id_cliente debe ser un número y fecha_entrega debe ser una fecha válida');
        }
        // validar existencia del cliente
        const cliente = await clienteRepository.obtenerPorId(datos.id_cliente);
        if (!cliente) {
            throw new Error('El cliente con el id proporcionado no existe');
        }
        return true;
    }

    async crear(datos) {
        // validar datos
        await this.validarDatos(datos);
        return EntregaRepository.crear(datos);
    }

    async actualizarEntrega(id, datos) {
        // validar existencia de la entrega
        const entrega = await EntregaRepository.obtenerPorId(id);
        if (!entrega) {
            return null;
        }
        // validar datos
        await this.validarDatos(datos);
        // actualizar la entrega
        return EntregaRepository.actualizar(id, datos);
    }

    async eliminarEntrega(id) {
        // validar existencia de la entrega
        const entrega = await EntregaRepository.obtenerPorId(id);
        if (!entrega) {
            return false;
        }
        // eliminar la entrega
        return EntregaRepository.eliminar(id);
    }

    async obtenerTodas() {
        return EntregaRepository.obtenerTodas();
    }

    async obtenerPorId(id) {
        // validar id
        if (!id) {
            throw new Error('ID es requerido');
        }
        if (typeof id !== 'number') {
            throw new Error('ID debe ser un número');
        }
        // Verificar si la entrega existe antes de obtener
        const entrega = await EntregaRepository.obtenerPorId(id);
        if (!entrega) {
            return null;
        }
        return entrega;
    }

    async obtenerPorCliente(id_cliente) {
        // validar id_cliente
        if (!id_cliente) {
            throw new Error('ID del cliente es requerido');
        }
        if (typeof id_cliente !== 'number') {
            throw new Error('ID del cliente debe ser un número');
        }
        // Verificar si el cliente existe antes de obtener las entregas
        const cliente = await clienteRepository.obtenerPorId(id_cliente);
        if (!cliente) {
            throw new Error('El cliente con el id proporcionado no existe');
        }
        // Obtener las entregas del cliente
        return EntregaRepository.obtenerPorCliente(id_cliente);
    }
}

export default new EntregaService();
