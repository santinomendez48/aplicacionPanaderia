import RepositorioBase from "./base_repository.js";
import { PrecioCliente } from "../models/index.js";

class PrecioClienteRepository extends RepositorioBase {
    constructor() {
        super(PrecioCliente);
    }

    async obtenerConFiltros(filtros) {
        return this.model.findAll({ where: filtros });
    }

}

export default new PrecioClienteRepository();
