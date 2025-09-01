import React, { useState, useEffect } from "react";
import { crearPrecioCliente, editarPrecioCliente } from "../services/precioClienteService";
import "../styles/clientes.css";

function ModalNuevoPrecioCliente({ abierto, onClose, onPrecioCreado, precioEditar, onPrecioEditado, clientes, productos }) {
    const [id_cliente, setIdCliente] = useState("");
    const [id_producto, setIdProducto] = useState("");
    const [precio_especial, setPrecio] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (precioEditar) {
            setIdCliente(precioEditar.id_cliente || "");
            setIdProducto(precioEditar.id_producto || "");
            setPrecio(precioEditar.precio_especial || "");
        } else {
            setIdCliente("");
            setIdProducto("");
            setPrecio("");
        }
    }, [precioEditar, abierto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError("");
        try {
            const datos = {
            id_cliente: parseInt(id_cliente, 10),
            id_producto: parseInt(id_producto, 10),
            precio_especial: parseFloat(precio_especial)
            };
        if (precioEditar) {
            const actualizado = await editarPrecioCliente(precioEditar.id_precio_cliente, datos);
            if (onPrecioEditado) onPrecioEditado(actualizado);
        } else {
            const nuevoPrecio = await crearPrecioCliente(datos);
            onPrecioCreado(nuevoPrecio);
        }
        setIdCliente("");
        setIdProducto("");
        setPrecio("");
        onClose();
        } catch (err) {
            setError("No se pudo guardar el precio especial");
        } finally {
            setCargando(false);
        }
    };

    if (!abierto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{precioEditar ? "Editar Precio Especial" : "Nuevo Precio Especial"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Cliente:</label>
                        <select value={id_cliente} onChange={e => setIdCliente(e.target.value)} required>
                            <option value="">Seleccionar cliente</option>
                            {clientes.map(c => (
                                <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Producto:</label>
                        <select value={id_producto} onChange={e => setIdProducto(e.target.value)} required>
                            <option value="">Seleccionar producto</option>
                            {productos.map(p => (
                                <option key={p.id_producto} value={p.id_producto}>{p.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Precio especial:</label>
                        <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={precio_especial}
                        onChange={e => setPrecio(e.target.value)}
                        required
                        />
                    </div>
                    {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <button className="btn btn-primary" type="submit" disabled={cargando}>
                        {cargando ? "Guardando..." : precioEditar ? "Guardar Cambios" : "Guardar"}
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

export default ModalNuevoPrecioCliente;
