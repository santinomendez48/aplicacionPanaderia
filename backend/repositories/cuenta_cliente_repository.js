
import RepositorioBase from "./base_repository.js";
import { CuentaCliente } from "../models/index.js";


class CuentaClienteRepository extends RepositorioBase {
    constructor() {
        super(CuentaCliente);
    }
    // Aquí puedes agregar métodos personalizados si lo necesitas
}

export default new CuentaClienteRepository();
