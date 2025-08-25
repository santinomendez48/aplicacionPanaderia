import clienteRepository from '../repositories/cliente_repository.js';

class ClienteService {
    async obtenerTodos() {
        return clienteRepository.obtenerTodos();
    }

    async crearCliente(datos) {
        // Validar datos antes de crear el cliente
        if (!datos.nombre || !datos.telefono || !datos.direccion) {
            throw new Error('Nombre, telefono y direccion son requeridos');
        }

        // Validar tipo de datos
        if (typeof datos.nombre !== 'string' || typeof datos.telefono !== 'string' || typeof datos.direccion !== 'string') {
            throw new Error('Nombre, telefono y direccion deben ser cadenas de texto');
        }

        // Verificar si el cliente ya existe
        const existe = await clienteRepository.existe({ telefono: datos.telefono });
        if (existe) {
            throw new Error('Ya existe un cliente con este telefono');
        }
        
        // Crear el cliente
        return clienteRepository.crear(datos);
    }

    async eliminarCliente(id) {
        // Verificar si el cliente existe antes de eliminar
        const cliente = await clienteRepository.obtenerPorId(id);
        if (!cliente) {
            return false;
        }
        // Eliminar el cliente
        return clienteRepository.eliminar(id);
    }

    async actualizarCliente(id, datos) {
        // Verificar si el cliente existe antes de actualizar
        const cliente = await clienteRepository.obtenerPorId(id);
        if (!cliente) {
            return null;
        }
        // Validar datos antes de actualizar
        if (!datos.nombre && !datos.telefono && !datos.direccion) {
            throw new Error('Al menos uno de los campos nombre, telefono o direccion debe ser proporcionado');
        }
        // Validar tipo de datos
        if (datos.nombre && typeof datos.nombre !== 'string') {
            throw new Error('Nombre debe ser una cadena de texto');
        }
        if (datos.telefono && typeof datos.telefono !== 'string') {
            throw new Error('Telefono debe ser una cadena de texto');
        }
        if (datos.direccion && typeof datos.direccion !== 'string') {
            throw new Error('Direccion debe ser una cadena de texto');
        }
        // Actualizar el cliente
        return clienteRepository.actualizar(id, datos);
    }

    async obtenerPorId(id) {
        // validar id
        if (!id) {
            throw new Error('ID es requerido');
        }
        if (typeof id !== 'number') {
            throw new Error('ID debe ser un número');
        }
        // Verificar si el cliente existe antes de obtener
        const cliente = await clienteRepository.obtenerPorId(id);
        if (!cliente) {
            return null;
        }
        return cliente;
    }
}

export default new ClienteService();