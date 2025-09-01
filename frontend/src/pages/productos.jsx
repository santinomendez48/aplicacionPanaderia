import { useEffect, useState } from "react";
import CardProducto from "../components/cardProducto.jsx";
import ModalNuevoProducto from "../components/ModalNuevoProducto.jsx";
import { obtenerProductos, eliminarProducto } from "../services/productoService";
import "../styles/clientes.css";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);

    useEffect(() => {
        refrescarProductos();
    }, []);

    const refrescarProductos = async () => {
        try {
            const lista = await obtenerProductos();
            setProductos(lista);
        } catch (err) {
            setProductos([]);
        }
    };

    const handleProductoCreado = () => {
        refrescarProductos();
    };

    const handleProductoEditado = () => {
        refrescarProductos();
    };

    const handleEditar = (producto) => {
        setProductoEditar(producto);
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
        setProductoEditar(null);
    };

    const handleEliminar = async (id_producto) => {
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            try {
                await eliminarProducto(id_producto);
                refrescarProductos();
            } catch (err) {
                alert("No se pudo eliminar el producto");
            }
        }
    };

    return (
        <div className="clientes-container">
            <div className="clientes-header">
                <h1>Productos</h1>
                <button className="btn btn-primary" onClick={() => { setMostrarModal(true); setProductoEditar(null); }}>
                    Crear nuevo producto
                </button>
            </div>
            <ModalNuevoProducto
                abierto={mostrarModal}
                onClose={handleCerrarModal}
                onProductoCreado={handleProductoCreado}
                productoEditar={productoEditar}
                onProductoEditado={handleProductoEditado}
            />
            <div className="clientes-lista">
                {productos.map((producto) => (
                    <CardProducto key={producto.id_producto} producto={producto} onEditar={handleEditar} onEliminar={handleEliminar} />
                ))}
            </div>
        </div>
    );
}

export default Productos;
