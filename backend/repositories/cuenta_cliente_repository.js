import RepositorioBase from "./base_repository";
import CuentaCliente from "../models/cuenta_cliente_model";

class CuentaClienteRepository extends RepositorioBase {
    constructor() {
        super(CuentaCliente);
    }

    async obtenerPorCliente(idCliente) {
        return this.modelo.findAll({
            where: { idCliente: idCliente },
            order: [['fecha', 'DESC']] // Ordenar por fecha de creación, más reciente primero
        });
    }   

    async existeCuentaCliente(idCliente, idCuenta) {
        return this.existe({ idCliente: idCliente, idCuentaCliente: idCuenta });
    }
}

export default new CuentaClienteRepository;
