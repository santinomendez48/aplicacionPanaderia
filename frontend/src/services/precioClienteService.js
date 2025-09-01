// Servicio para precios especiales de clientes

export async function obtenerPreciosCliente() {
    const res = await fetch("http://localhost:3000/api/precio_cliente");
    if (!res.ok) throw new Error("Error al obtener precios de clientes");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.preciosCliente)) return data.preciosCliente;
    return [];
}

export async function obtenerPreciosPorCliente(id_cliente) {
    const res = await fetch(`http://localhost:3000/api/precio_cliente/cliente/${id_cliente}`);
    if (!res.ok) throw new Error("Error al obtener precios del cliente");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.preciosCliente)) return data.preciosCliente;
    return [];
}

export async function obtenerPreciosPorProducto(id_producto) {
    const res = await fetch(`http://localhost:3000/api/precio_cliente/producto/${id_producto}`);
    if (!res.ok) throw new Error("Error al obtener precios del producto");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.preciosPorProducto)) return data.preciosPorProducto;
    return [];
}

export async function crearPrecioCliente(datos) {
    console.log(datos)
    const res = await fetch("http://localhost:3000/api/precio_cliente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datos }),
    });
    if (!res.ok) throw new Error("Error al crear precio especial");
    const data = await res.json();
    return data.precioCliente || data;
}

export async function editarPrecioCliente(id, datos) {
    const res = await fetch(`http://localhost:3000/api/precio_cliente/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datos }),
    });
    if (!res.ok) throw new Error("Error al editar precio especial");
    const data = await res.json();
    return data.precioCliente || data;
}

export async function eliminarPrecioCliente(id) {
    console.log(id)
    const res = await fetch(`http://localhost:3000/api/precio_cliente/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar precio especial");
    return true;
}
