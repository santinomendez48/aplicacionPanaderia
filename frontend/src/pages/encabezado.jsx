import { NavLink } from "react-router-dom";
import "../styles/inicio-encabezado.css";
import { useState, useEffect } from "react";

function Encabezado() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const toggleMenu = () => setMenuAbierto((v) => !v);
    const closeMenu = () => setMenuAbierto(false);
        // Cerrar menú automáticamente al cambiar tamaño de ventana
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 900) setMenuAbierto(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="encabezado-navbar">
            <NavLink className="logo" to="/inicio" onClick={closeMenu}>
                &nbsp;<i>Inicio</i>
            </NavLink>
            <button className={"menu-toggle" + (menuAbierto ? " open" : "")}
                aria-label="Abrir menú"
                onClick={toggleMenu}
            >
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
                <span className="menu-bar"></span>
            </button>
            <div className={"nav-links" + (menuAbierto ? " show" : "") }>
                <NavLink className="nav-link" to="/repartos" onClick={closeMenu}>Reparto</NavLink>
                <NavLink className="nav-link" to="/clientes" onClick={closeMenu}>Clientes</NavLink>
                <NavLink className="nav-link" to="/productos" onClick={closeMenu}>Productos</NavLink>
                <NavLink className="nav-link" to="/precios" onClick={closeMenu}>Precios</NavLink>
                <div className="nav-link dropdown">
                    Informes
                    <div className="dropdown-content">
                        <NavLink className="dropdown-item" to="/informes/ingresos" onClick={closeMenu}>Ingresos</NavLink>
                        <NavLink className="dropdown-item" to="/informes/gastos" onClick={closeMenu}>Gastos</NavLink>
                    </div>
                </div>
                <NavLink className="nav-link" to="/panaderia" onClick={closeMenu}>Panaderia (PROX)</NavLink>
                <NavLink className="nav-link" to="/panaderia/compras" onClick={closeMenu}>Compras</NavLink>
                <NavLink className="nav-link" to="/panaderia/ventas" onClick={closeMenu}>Ventas</NavLink>
            </div>
        </nav>
    );
}

export default Encabezado;
