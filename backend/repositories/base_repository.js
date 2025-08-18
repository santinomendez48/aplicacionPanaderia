export default class RepositorioBase {
    constructor(modelo) {
        this.modelo = modelo;
    }
 
    async crear(datos) {
        return this.modelo.create(datos);
    }

    async obtenerTodos() {
        return this.modelo.findAll();
    }

    async obtenerPorId(id) {
        return this.modelo.findByPk(id);
    }

    async actualizar(id, datos) {
        const instancia = await this.modelo.findByPk(id);
        if (instancia) {
            return instancia.update(datos);
        }
        return null;
    }

    async eliminar(id) {
        const instancia = await this.modelo.findByPk(id);   
        if (instancia) {
            await instancia.destroy();
            return true;
        }  
        return false;
    }

    async buscar(condiciones) {
        return this.modelo.findAll({ where: condiciones });
    }

    async contar(condiciones) {
        return this.modelo.count({ where: condiciones });
    }

    async existe(condiciones) {
        const count = await this.modelo.count({ where: condiciones });
        return count > 0;
    }
}
