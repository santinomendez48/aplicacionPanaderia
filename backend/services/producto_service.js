import productoRepository from "../repositories/producto_repository.js";

class ProductoService {
    async validarDatos(datos) {
        console.log('Validando datos del producto:', datos);
        // Validar dato
        if (!datos.nombre) {
            throw new Error('Nombre debe ser proporcionado');
        }
        if (!datos.precio_compra) {
            throw new Error('Precio de compra debe ser proporcionado');
        }
        // Validar tipo de dato
        if (typeof datos.nombre !== 'string') {
            throw new Error('Nombre debe ser una cadena de texto');
        }
        if (isNaN(datos.precio_compra) || Number(datos.precio_compra) <= 0) {
            throw new Error('Precio de compra debe ser un número positivo');
        }
    }

    async obtenerTodos() {
        return productoRepository.obtenerTodos();
    }

    async crearProducto(datos) {
        // Validar datos antes de crear el producto
        await this.validarDatos(datos);
        // Verificar si el producto ya existe
        const existe = await productoRepository.existe({ nombre: datos.nombre });
        if (existe) {
            throw new Error('Ya existe un producto con este nombre');
        }
        // Crear el producto
        return productoRepository.crear(datos);
    }

    async eliminarProducto(id) {
        // Verificar si el producto existe antes de eliminar
        const producto = await productoRepository.obtenerPorId(id);
        if (!producto) {
            return false;
        }
        // Eliminar el producto
        return productoRepository.eliminar(id);
    }

    async actualizarProducto(id, datos) {
        // Verificar si el producto existe antes de actualizar
        const producto = await productoRepository.obtenerPorId(id);
        if (!producto) {
            return null;
        }
        // Validar datos antes de actualizar
        await this.validarDatos(datos);
        // Actualizar el producto
        return productoRepository.actualizar(id, datos);
    }

    async obtenerPorId(id) {
        // validar id
        if (!id) {
            throw new Error('ID es requerido');
        }
        if (typeof id !== 'number') {
            throw new Error('ID debe ser un número');
        }
        // validar si el producto existe
        const producto = await productoRepository.obtenerPorId(id);
        if (!producto) {
            return null;
        }
        return producto;
    }
}

export default new ProductoService();