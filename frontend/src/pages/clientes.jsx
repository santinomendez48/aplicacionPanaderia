import React, { useEffect, useState } from "react";
import CardCliente from "../components/cardCliente.jsx";
import ModalNuevoCliente from "../components/ModalNuevoCliente.jsx";
import { obtenerClientes, eliminarCliente } from "../services/clienteService";
import "../styles/clientes.css";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [clienteEditar, setClienteEditar] = useState(null);

    useEffect(() => {
        obtenerClientes()
            .then(setClientes)
            .catch((err) => {
                console.error(err);
                setClientes([]);
            });
    }, []);

    const refrescarClientes = async () => {
        try {
            const lista = await obtenerClientes();
            setClientes(lista);
        } catch (err) {
            setClientes([]);
        }
    };

    const handleClienteCreado = () => {
        refrescarClientes();
    };

    const handleClienteEditado = () => {
        refrescarClientes();
    };

    const handleEditar = (cliente) => {
        setClienteEditar(cliente);
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
        setClienteEditar(null);
    };

    const handleEliminar = async (id_cliente) => {
        if (window.confirm("¿Seguro que deseas eliminar este cliente?")) {
            try {
                await eliminarCliente(id_cliente);
                refrescarClientes();
            } catch (err) {
                alert("No se pudo eliminar el cliente");
            }
        }
    };

    return (
        <div className="clientes-container">
            <div className="clientes-header">
                <h1>Clientes</h1>
                <button className="btn btn-primary" onClick={() => { setMostrarModal(true); setClienteEditar(null); }}>
                    Crear nuevo cliente
                </button>
            </div>
            <ModalNuevoCliente
                abierto={mostrarModal}
                onClose={handleCerrarModal}
                onClienteCreado={handleClienteCreado}
                clienteEditar={clienteEditar}
                onClienteEditado={handleClienteEditado}
            />
            <div className="clientes-lista">
                {clientes.map((cliente) => (
                    <CardCliente key={cliente.id_cliente} cliente={cliente} onEditar={handleEditar} onEliminar={handleEliminar} />
                ))}
            </div>
        </div>
    );
}

export default Clientes;