import "../styles/clientes.css";

const CardPrecioCliente = ({ clientes, productos, precio, onEditar, onEliminar }) => {
    const cliente = clientes.find(c => c.id_cliente === precio.id_cliente);
    const producto = productos.find(p => p.id_producto === precio.id_producto);
    return (
        <div className="card-cliente">
            <h3>{cliente.nombre} - {producto.nombre}</h3>
            <p><strong>Precio:</strong> ${precio.precio_especial}</p>
            <div className="card-actions">
                <button className="btn btn-primary" onClick={() => onEditar(precio)}>
                    Editar
                </button>
                <button className="btn btn-danger" onClick={() => onEliminar(precio.id_precio)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default CardPrecioCliente;
