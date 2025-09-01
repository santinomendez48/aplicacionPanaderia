
const CardCliente = ({ cliente, onEditar, onEliminar }) => {
    return (
        <div className="card-cliente">
            <h3>{cliente.nombre}</h3>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            <div className="card-actions">
                <button className="btn btn-primary" onClick={() => onEditar(cliente)}>
                    Editar
                </button>
                <button className="btn btn-danger" onClick={() => onEliminar(cliente.id_cliente)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default CardCliente;