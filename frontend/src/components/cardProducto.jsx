import "../styles/clientes.css";

const CardProducto = ({ producto, onEditar, onEliminar }) => {
    return (
        <div className="card-cliente">
            <h3>{producto.nombre}</h3>
            <p><strong>Precio de Compra:</strong> ${producto.precio_compra}</p>
            <div className="card-actions">
                <button className="btn btn-primary" onClick={() => onEditar(producto)}>
                    Editar
                </button>
                <button className="btn btn-danger" onClick={() => onEliminar(producto.id_producto)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default CardProducto;
