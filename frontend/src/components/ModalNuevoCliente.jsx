import React, { useState } from "react";
import { crearCliente, editarCliente } from "../services/clienteService";


function ModalNuevoCliente({ abierto, onClose, onClienteCreado, clienteEditar, onClienteEditado }) {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    React.useEffect(() => {
        if (clienteEditar) {
            setNombre(clienteEditar.nombre || "");
            setTelefono(clienteEditar.telefono || "");
        } else {
            setNombre("");
            setTelefono("");
        }
    }, [clienteEditar, abierto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError("");
        try {
            if (clienteEditar) {
                const actualizado = await editarCliente({ id: clienteEditar.id_cliente, nombre, telefono });
                if (onClienteEditado) onClienteEditado(actualizado);
            } else {
                const nuevoCliente = await crearCliente({ nombre, telefono });
                onClienteCreado(nuevoCliente);
            }
            setNombre("");
            setTelefono("");
            onClose();
        } catch (err) {
            setError("No se pudo guardar el cliente");
        } finally {
            setCargando(false);
        }
    };

        if (!abierto) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>{clienteEditar ? "Editar Cliente" : "Nuevo Cliente"}</h2>
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
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                value={telefono}
                                onChange={e => setTelefono(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
                        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                            <button className="btn btn-primary" type="submit" disabled={cargando}>
                                {cargando ? "Guardando..." : clienteEditar ? "Guardar Cambios" : "Guardar"}
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

export default ModalNuevoCliente;
