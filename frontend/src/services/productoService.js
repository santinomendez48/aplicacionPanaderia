// Servicio para productos
export async function obtenerProductos() {
    const res = await fetch("http://localhost:3000/api/productos");
    if (!res.ok) throw new Error("Error al obtener productos");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.productos)) return data.productos;
    return [];
}

export async function crearProducto({ nombre, precio_compra }) {
    const res = await fetch("http://localhost:3000/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio_compra }),
    });
    if (!res.ok) throw new Error("Error al crear producto");
    return await res.json();
}

export async function editarProducto({ id_producto, nombre, precio_compra }) {
    const res = await fetch(`http://localhost:3000/api/productos/${id_producto}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio_compra }),
    });
    if (!res.ok) throw new Error("Error al editar producto");
    return await res.json();
}

export async function eliminarProducto(id_producto) {
    const res = await fetch(`http://localhost:3000/api/productos/${id_producto}`, {
        method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar producto");
    return true;
}
