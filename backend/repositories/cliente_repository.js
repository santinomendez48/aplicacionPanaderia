import RepositorioBase from './base_repository.js';
import Cliente from '../models/cliente_model.js';

class ClienteRepository extends RepositorioBase {
    constructor() {
        super(Cliente);
    }
}

export default new ClienteRepository();