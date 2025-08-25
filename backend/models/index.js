import clienteModel from "./cliente.js";
import productoModel from "./producto.js";
import entregaModel from "./entrega.js";
import detalleEntregaModel from "./detalleEntrega.js";
import cuentaClienteModel from "./cuentaCliente.js";
import precioClienteModel from "./precioCliente.js";
import sequelize from "../.data/db.js";

// Inicializar modelos
export const Cliente = clienteModel(sequelize);
export const Producto = productoModel(sequelize);
export const Entrega = entregaModel(sequelize);
export const DetalleEntrega = detalleEntregaModel(sequelize);
export const CuentaCliente = cuentaClienteModel(sequelize);
export const PrecioCliente = precioClienteModel(sequelize);

// Relaciones
Cliente.hasMany(Entrega, { foreignKey: "id_cliente" });
Entrega.belongsTo(Cliente, { foreignKey: "id_cliente" });

Entrega.hasMany(DetalleEntrega, { foreignKey: "id_entrega" });
DetalleEntrega.belongsTo(Entrega, { foreignKey: "id_entrega" });

Producto.hasMany(DetalleEntrega, { foreignKey: "id_producto" });
DetalleEntrega.belongsTo(Producto, { foreignKey: "id_producto" });

Cliente.hasMany(CuentaCliente, { foreignKey: "id_cliente" });
CuentaCliente.belongsTo(Cliente, { foreignKey: "id_cliente" });

Entrega.hasMany(CuentaCliente, { foreignKey: "id_entrega" });
CuentaCliente.belongsTo(Entrega, { foreignKey: "id_entrega" });

Cliente.hasMany(PrecioCliente, { foreignKey: "id_cliente" });
PrecioCliente.belongsTo(Cliente, { foreignKey: "id_cliente" });

Producto.hasMany(PrecioCliente, { foreignKey: "id_producto" });
PrecioCliente.belongsTo(Producto, { foreignKey: "id_producto" });
