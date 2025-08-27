import RepositorioBase from "./base_repository.js";
import { Entrega } from "../models/index.js";

class EntregaRepository extends RepositorioBase {
    constructor() {
        super(Entrega);
    }
}

export default new EntregaRepository();
