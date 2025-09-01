import { useState, useEffect } from "react";
import { crearProducto, editarProducto } from "../services/productoService";
import "../styles/clientes.css";

function ModalNuevoProducto({ abierto, onClose, onProductoCreado, productoEditar, onProductoEditado }) {
    const [nombre, setNombre] = useState("");
    const [precio_compra, setPrecio] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (productoEditar) {
            setNombre(productoEditar.nombre || "");
            setPrecio(productoEditar.precio_compra || "");
        } else {
            setNombre("");
            setPrecio("");
        }
    }, [productoEditar, abierto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError("");
        try {
        if (productoEditar) {
            const actualizado = await editarProducto({ id_producto: productoEditar.id_producto, nombre, precio_compra });
            if (onProductoEditado) onProductoEditado(actualizado);
        } else {
            const nuevoProducto = await crearProducto({ nombre, precio_compra });
            onProductoCreado(nuevoProducto);
        }
        setNombre("");
        setPrecio("");
        onClose();
        } catch (err) {
            setError("No se pudo guardar el producto");
        } finally {
            setCargando(false);
        }
    };

    if (!abierto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{productoEditar ? "Editar Producto" : "Nuevo Producto"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio de Compra:</label>
                        <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={precio_compra}
                        onChange={e => setPrecio(e.target.value)}
                        required
                        />
                    </div>
                    {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <button className="btn btn-primary" type="submit" disabled={cargando}>
                            {cargando ? "Guardando..." : productoEditar ? "Guardar Cambios" : "Guardar"}
                        </button>
                        <button className="btn" type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalNuevoProducto;
