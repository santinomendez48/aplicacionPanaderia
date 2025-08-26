
import RepositorioBase from "./base_repository.js";
import CuentaCliente from "../models/index.js";


class CuentaClienteRepository extends RepositorioBase {
    constructor() {
        super(CuentaCliente);
    }
}

export default new CuentaClienteRepository();
