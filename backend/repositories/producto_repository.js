import RepositorioBase from "./base_repository.js";
import { Producto } from "../models/index.js";

class ProductoRepository extends RepositorioBase {
    constructor() {
        super(Producto);
    }
}

export default new ProductoRepository();
