import clienteRepository from '../repositories/cliente_repository.js';

class ClienteService {
    async validarDatos() {
        // Validar existencia de datos 
        if (!datos.nombre) {
            throw new Error('Nombre es requerido!');
        }
        if (!datos.telefono) {
            throw new Error('Telefono es requerido!')
        }
        // Validar tipos de datos
        if (typeof datos.nombre !== 'string') {
            throw new Error('Nombre debe ser una cadena de texto!');
        }
        if (typeof datos.nombre !== 'string') {
            throw new Error('Telefono debe ser una cadena de texto!')
        }
        return true;
    }

    async obtenerTodos() {
        return clienteRepository.obtenerTodos();
    }

    async crearCliente(datos) {
        // validar datos
        await this.validarDatos(datos)
        // Verificar si el cliente ya existe
        const existe = await clienteRepository.existe({ telefono: datos.telefono, nombre: datos.nombre });
        if (existe) {
            throw new Error('El cliente ya existe!');
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
        await this.validarDatos(datos);
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