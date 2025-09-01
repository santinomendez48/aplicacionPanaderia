import { useEffect, useState } from "react";
import CardPrecioCliente from "../components/cardPrecioCliente.jsx";
import ModalNuevoPrecioCliente from "../components/ModalNuevoPrecioCliente.jsx";
import { obtenerPreciosCliente, eliminarPrecioCliente } from "../services/precioClienteService";
import { obtenerClientes } from "../services/clienteService";
import { obtenerProductos } from "../services/productoService";
import "../styles/clientes.css";

function PreciosCliente() {
    const [precios, setPrecios] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState("");
    const [filtroProducto, setFiltroProducto] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [precioEditar, setPrecioEditar] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);


    useEffect(() => {
        // Cargar clientes y productos primero
        const cargarDatos = async () => {
            try {
                const [clientesData, productosData] = await Promise.all([
                    obtenerClientes(),
                    obtenerProductos()
                ]);
                setClientes(clientesData);
                setProductos(productosData);
                refrescarPrecios();
            } catch (err) {
                setClientes([]);
                setProductos([]);
            }
        };
        cargarDatos();
    }, []);

    const refrescarPrecios = async () => {
        try {
            const preciosData = await obtenerPreciosCliente();
            setPrecios(preciosData);
        } catch (err) {
            setPrecios([]);
        }
    };


    const handlePrecioCreado = () => {
        refrescarPrecios();
    };

    const handlePrecioEditado = () => {
        refrescarPrecios();
    };

    const handleEditar = (precio) => {
        setPrecioEditar(precio);
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
        setPrecioEditar(null);
    };


    const handleEliminar = async (id_precio) => {
        if (window.confirm("¿Seguro que deseas eliminar este precio especial?")) {
            try {
                await eliminarPrecioCliente(id_precio);
                refrescarPrecios();
            } catch (err) {
                alert("No se pudo eliminar el precio especial");
            }
        }
    };

    const cargandoDatos = clientes.length === 0 || productos.length === 0;

    // Filtrado de precios
    const preciosFiltrados = precios.filter((precio) => {
        const coincideCliente = !filtroCliente || String(precio.id_cliente) === String(filtroCliente);
        const coincideProducto = !filtroProducto || String(precio.id_producto) === String(filtroProducto);
        return coincideCliente && coincideProducto;
    });

    return (
        <div className="clientes-container">
            <div className="clientes-header">
                <h1>Precios Especiales por Cliente</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => { setMostrarModal(true); setPrecioEditar(null); }}
                    disabled={cargandoDatos}
                >
                    {cargandoDatos ? "Cargando..." : "Crear nuevo precio especial"}
                </button>
            </div>
            {/* Filtros */}
            {!cargandoDatos && (
                <div className="filtros-precios">
                    <div className="filtro-item">
                        <label htmlFor="filtroCliente">Cliente</label>
                        <select id="filtroCliente" value={filtroCliente} onChange={e => setFiltroCliente(e.target.value)}>
                            <option value="">Todos</option>
                            {clientes.map(c => (
                                <option key={c.id_cliente} value={c.id_cliente}>{c.nombre || c.nombre_cliente || c.razon_social}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filtro-item">
                        <label htmlFor="filtroProducto">Producto</label>
                        <select id="filtroProducto" value={filtroProducto} onChange={e => setFiltroProducto(e.target.value)}>
                            <option value="">Todos</option>
                            {productos.map(p => (
                                <option key={p.id_producto} value={p.id_producto}>{p.nombre || p.nombre_producto}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            {mostrarModal && !cargandoDatos && (
                <ModalNuevoPrecioCliente
                    abierto={mostrarModal}
                    onClose={handleCerrarModal}
                    onPrecioCreado={handlePrecioCreado}
                    precioEditar={precioEditar}
                    onPrecioEditado={handlePrecioEditado}
                    clientes={clientes}
                    productos={productos}
                />
            )}
            {cargandoDatos ? (
                <div style={{textAlign:'center',marginTop:40}}>Cargando datos de clientes y productos...</div>
            ) : (
                <div className="clientes-lista">
                    {preciosFiltrados.map((precio) => (
                        <CardPrecioCliente
                            key={precio.id_precio_cliente}
                            precio={precio}
                            clientes={clientes}
                            productos={productos}
                            onEditar={handleEditar}
                            onEliminar={handleEliminar}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PreciosCliente;
