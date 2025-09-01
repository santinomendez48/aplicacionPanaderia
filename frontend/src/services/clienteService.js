export async function eliminarCliente(id_cliente) {
    const res = await fetch(`http://localhost:3000/api/clientes/${id_cliente}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar cliente");
    return true;
}

export async function editarCliente({ id, nombre, telefono }) {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}` , {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono }),
    });
    if (!res.ok) throw new Error("Error al editar cliente");
    return await res.json();
}

export async function obtenerClientes() {
    const res = await fetch("http://localhost:3000/api/clientes");
    if (!res.ok) throw new Error("Error al obtener clientes");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.clientes)) return data.clientes;
    return [];
}

export async function crearCliente({ nombre, telefono }) {
    const res = await fetch("http://localhost:3000/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono }),
    });
    if (!res.ok) throw new Error("Error al crear cliente");
    return await res.json();
}
