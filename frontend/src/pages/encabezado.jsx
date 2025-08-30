import { NavLink} from "react-router-dom";

function Encabezado() {

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-md no-print px-2">
            <a className="navbar-brand" href="/inicio">
                &nbsp;<i>Inicio</i>
            </a>
            <a className="navbar-brand">
                &nbsp;<i>Reparto</i>
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/repartos">
                            Repartos
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/clientes">
                            Clientes
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Productos">
                            Productos
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown bg-dark">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#!"
                            id="navbarDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Informes
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                            <li>
                                <a className="dropdown-item" href="#!">
                                    Ingresos
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item  dropdown-menu-dark" href="#!">
                                    Gastos
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <a className="navbar-brand" href="/panaderia">
                    &nbsp;<i>Panaderia (PROX)</i>
                </a>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/panaderia/compras">
                            Compras
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/panaderia/ventas">
                            Ventas
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Encabezado;
