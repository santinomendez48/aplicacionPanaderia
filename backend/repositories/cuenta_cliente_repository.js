
import RepositorioBase from "./base_repository.js";
import { CuentaCliente } from "../models/index.js";


class CuentaClienteRepository extends RepositorioBase {
    constructor() {
        super(CuentaCliente);
    }

    async obtenerPorClienteId(cliente_id) {
        return this.model.findAll({ where: { cliente_id } });
    }
}

export default new CuentaClienteRepository();
