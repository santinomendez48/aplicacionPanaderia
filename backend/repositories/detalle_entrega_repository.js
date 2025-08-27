import RepositorioBase from "./base_repository.js";
import { DetalleEntrega } from "../models/index.js";

class DetalleEntregaRepository extends RepositorioBase {
    constructor() {
        super(DetalleEntrega);
    }

    async obtenerPorEntrega(id_entrega) {
        return this.modelo.findAll({ where: { id_entrega } });
    }

    async eliminarPorEntrega(id_entrega) {
        return this.modelo.destroy({ where: { id_entrega } });
    }
}

export default new DetalleEntregaRepository();
