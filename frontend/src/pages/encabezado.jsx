import { NavLink } from "react-router-dom";
import "../styles/inicio-encabezado.css";

function Encabezado() {
    return (
        <nav className="encabezado-navbar">
            <NavLink className="logo" to="/inicio">
                &nbsp;<i>Inicio</i>
            </NavLink>
            <div className="nav-links">
                <NavLink className="nav-link" to="/repartos">Reparto</NavLink>
                <NavLink className="nav-link" to="/clientes">Clientes</NavLink>
                <NavLink className="nav-link" to="/productos">Productos</NavLink>
                <NavLink className="nav-link" to="/precios">Precios</NavLink>
                <div className="nav-link dropdown">
                    Informes
                    <div className="dropdown-content">
                        <NavLink className="dropdown-item" to="/informes/ingresos">Ingresos</NavLink>
                        <NavLink className="dropdown-item" to="/informes/gastos">Gastos</NavLink>
                    </div>
                </div>
                <NavLink className="nav-link" to="/panaderia">
                    Panaderia (PROX)
                </NavLink>
                <NavLink className="nav-link" to="/panaderia/compras">Compras</NavLink>
                <NavLink className="nav-link" to="/panaderia/ventas">Ventas</NavLink>
            </div>
        </nav>
    );
}

export default Encabezado;
