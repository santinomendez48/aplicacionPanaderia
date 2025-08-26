import precioClienteRepository from "../repositories/precio_cliente_repository.js";
import clienteRepository from "../repositories/cliente_repository.js";
import productoRepository from "../repositories/producto_repository.js";

class PrecioClienteService {
    async crearPrecioCliente(datos) {
        // Validar datos antes de crear el precio especial para cliente
        if (!datos.id_cliente || !datos.id_producto || !datos.precio_especial) {
            throw new Error('id_cliente, id_producto y precio_especial son obligatorios');
        }
        // Validar tipo de datos
        if (typeof datos.id_cliente !== 'number' || typeof datos.id_producto !== 'number' || typeof datos.precio_especial !== 'number') {
            throw new Error('id_cliente e id_producto deben ser números, precio_especial debe ser un número');
        }
        if (datos.precio_especial <= 0) {
            throw new Error('precio_especial debe ser un número positivo');
        }
        // Validar existencia del cliente
        const cliente = await clienteRepository.obtenerPorId(datos.id_cliente);
        if (!cliente) {
            throw new Error('El cliente con el id proporcionado no existe');
        }
        // Validar existencia del producto
        const producto = await productoRepository.obtenerPorId(datos.id_producto);
        if (!producto) {
            throw new Error('El producto con el id proporcionado no existe');
        }
        // Verificar si ya existe un precio especial para este cliente y producto
        const existe = await precioClienteRepository.existe({ id_cliente: datos.id_cliente, id_producto: datos.id_producto });
        if (existe) {
            throw new Error('Ya existe un precio especial para este cliente y producto');
        }
        // Crear el precio especial para cliente
        return precioClienteRepository.crear(datos);
    }

    async obtenerTodos() {
        return precioClienteRepository.obtenerTodos();
    }

    async obtenerPorId(id) {
        return precioClienteRepository.obtenerPorId(id);
    }

    async obtenerPorCliente(id_cliente) {
        // validar dato
        if (!id_cliente) {
            throw new Error('id_cliente es obligatorio');
        }
        if (typeof id_cliente !== 'number') {
            throw new Error('id_cliente debe ser un número');
        }
        // Validar existencia del cliente
        const cliente = await clienteRepository.obtenerPorId(id_cliente);
        if (!cliente) {
            throw new Error('El cliente con el id proporcionado no existe');
        }

        return precioClienteRepository.obtenerConFiltros({ id_cliente: id_cliente });
    }

    async obtenerPorProducto(id_producto) {
        // validar dato
        if (!id_producto) {
            throw new Error('id_producto es obligatorio');
        }
        if (typeof id_producto !== 'number') {
            throw new Error('id_producto debe ser un número');
        }
        // Validar existencia del producto
        const producto = await productoRepository.obtenerPorId(id_producto);
        if (!producto) {
            throw new Error('El producto con el id proporcionado no existe');
        }

        return precioClienteRepository.obtenerConFiltros({ id_producto: id_producto });
    }

    async obtenerPorClienteProducto(id_cliente, id_producto) {
        // validar datos
        if (!id_cliente || !id_producto) {
            throw new Error('id_cliente e id_producto son obligatorios');
        }
        if (typeof id_cliente !== 'number' || typeof id_producto !== 'number') {
            throw new Error('id_cliente e id_producto deben ser números');
        }
        // Validar existencia del cliente
        const cliente = await clienteRepository.obtenerPorId(id_cliente);
        if (!cliente) {
            throw new Error('El cliente con el id proporcionado no existe');
        }
        // Validar existencia del producto
        const producto = await productoRepository.obtenerPorId(id_producto);
        if (!producto) {
            throw new Error('El producto con el id proporcionado no existe');
        }

        return precioClienteRepository.obtenerConFiltros({ id_cliente: id_cliente, id_producto: id_producto });
    }

    async actualizarPrecioCliente(id, datos) {
        // Validar existencia del precio especial para cliente
        const precioCliente = await precioClienteRepository.obtenerPorId(id);
        if (!precioCliente) {
            return null;
        }
        // Validar datos antes de actualizar
        if (!datos.id_cliente && !datos.id_producto && !datos.precio_especial) {
            throw new Error('Al menos uno de los campos id_cliente, id_producto o precio_especial debe ser proporcionado');
        }
        // Validar tipo de datos
        if (datos.id_cliente && typeof datos.id_cliente !== 'number') {
            throw new Error('id_cliente debe ser un número');
        }
        if (datos.id_producto && typeof datos.id_producto !== 'number') {
            throw new Error('id_producto debe ser un número');
        }
        if (datos.precio_especial && typeof datos.precio_especial !== 'number') {
            throw new Error('precio_especial debe ser un número');
        }
        if (datos.precio_especial && datos.precio_especial <= 0) {
            throw new Error('precio_especial debe ser un número positivo');
        }
        // Validar existencia del cliente si se proporciona id_cliente
        if (datos.id_cliente) {
            const cliente = await clienteRepository.obtenerPorId(datos.id_cliente);
            if (!cliente) {
                throw new Error('El cliente con el id proporcionado no existe');
            }
        }
        // Validar existencia del producto si se proporciona id_producto
        if (datos.id_producto) {
            const producto = await productoRepository.obtenerPorId(datos.id_producto);
            if (!producto) {
                throw new Error('El producto con el id proporcionado no existe');
            }
        }
        // Actualizar el precio especial para cliente
        return precioClienteRepository.actualizar(id, datos);
    }

    async eliminarPrecioCliente(id) {
        // Validar existencia del precio especial para cliente
        const precioCliente = await precioClienteRepository.obtenerPorId(id);
        if (!precioCliente) {
            return false;
        }
        return precioClienteRepository.eliminar(id);
    }
}

export default new PrecioClienteService();
