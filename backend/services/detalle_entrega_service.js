import DetalleEntregaRepository from '../repositories/detalle_entrega_repository.js';
import EntregaRepository from '../repositories/entrega_repository.js';
import ProductoRepository from '../repositories/producto_repository.js';

class DetalleEntregaService {
    async validarDatos(datos) {
        // validar datos
        if (!datos.id_entrega || !datos.id_producto || !datos.cantidad || !datos.precio_unitario) {
            throw new Error('Todos los campos son obligatorios: id_entrega, id_producto, cantidad, precio_unitario');
        }
        // Validar tipos de datos
        if (typeof datos.id_entrega !== 'number' || typeof datos.id_producto !== 'number') {
            throw new Error('id_entrega e id_producto deben ser números');
        }
        if (!Number.isInteger(datos.cantidad) || datos.cantidad <= 0) {
            throw new Error('cantidad debe ser un entero positivo');
        }
        if (typeof datos.precio_unitario !== 'number' || datos.precio_unitario <= 0) {
            throw new Error('precio_unitario debe ser un número positivo');
        }
        return true;
    }

    async obtenerTodos() {
        return DetalleEntregaRepository.obtenerTodos();
    }

    async obtenerPorId(id) {
        // validar id
        if (!id || isNaN(id)) {
            throw new Error('ID inválido');
        }
        return DetalleEntregaRepository.obtenerPorId(id);
    }

    async crearDetalleEntrega(datos) { 
        // validar datos
        await this.validarDatos(datos);
        // validar existencia de la entrega y el producto
        const entrega = await EntregaRepository.obtenerPorId(datos.id_entrega);
        if (!entrega) {
            throw new Error('La entrega referenciada no existe');
        }
        const producto = await ProductoRepository.obtenerPorId(datos.id_producto);
        if (!producto) {
            throw new Error('El producto referenciado no existe');
        }
        return DetalleEntregaRepository.crear(datos);
    }

    async actualizarDetalleEntrega(id, datos) {
        // validar existencia del detalle
        const detalle = await this.repositorio.obtenerPorId(id);
        if (!detalle) {
            throw new Error('Detalle de entrega no encontrado');
        }
        // validar datos
        await this.validarDatos(datos);
        // validar existencia de la entrega y el producto si se están actualizando
        if (datos.id_entrega) {
            const entrega = await EntregaRepository.obtenerPorId(datos.id_entrega);
            if (!entrega) {
                throw new Error('La entrega referenciada no existe');
            }
        }
        if (datos.id_producto) {
            const producto = await ProductoRepository.obtenerPorId(datos.id_producto);
            if (!producto) {
                throw new Error('El producto referenciado no existe');
            }
        }
        return this.repositorio.actualizar(id, datos);
    }

    async eliminarDetalleEntrega(id) {
        // validar id
        if (!id || isNaN(id)) {
            throw new Error('ID invalido');
        }
        // validar existencia
        const detalle = await this.repositorio.obtenerPorId(id);
        if (!detalle) {
            return null;
        }
        return this.repositorio.eliminar(id);
    }

    async obtenerPorEntrega(id_entrega) {
        // validar id_entrega
        if (!id_entrega || isNaN(id_entrega)) {
            throw new Error('ID de entrega invalido');
        }
        // validar existencia de la entrega
        const entrega = await EntregaRepository.obtenerPorId(id_entrega);
        if (!entrega) {
            throw new Error('La entrega referenciada no existe');
        }
        return DetalleEntregaRepository.obtenerPorEntrega(id_entrega);
    }

    async eliminarPorEntrega(id_entrega) {
        // validar id_entrega
        if (!id_entrega || isNaN(id_entrega)) {
            throw new Error('ID de entrega invalido');
        }
        // validar existencia de la entrega
        const entrega = await EntregaRepository.obtenerPorId(id_entrega);
        if (!entrega) {
            throw new Error('La entrega referenciada no existe');
        }
        return DetalleEntregaRepository.eliminarPorEntrega(id_entrega);
    }
}

export default new DetalleEntregaService();
