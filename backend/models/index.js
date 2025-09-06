import clienteModel from "./cliente_model.js";
import productoModel from "./producto_model.js";
import entregaModel from "./entrega_model.js";
import detalleEntregaModel from "./detalle_entrega_model.js";
import cuentaClienteModel from "./cuenta_cliente_model.js";
import precioClienteModel from "./precio_cliente_model.js";
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

Cliente.hasMany(CuentaCliente, { foreignKey: "cliente_id" });
CuentaCliente.belongsTo(Cliente, { foreignKey: "cliente_id" });

Entrega.hasOne(CuentaCliente, { foreignKey: "entrega_id" });
CuentaCliente.belongsTo(Entrega, { foreignKey: "entrega_id" });

Cliente.hasMany(PrecioCliente, { foreignKey: "id_cliente" });
PrecioCliente.belongsTo(Cliente, { foreignKey: "id_cliente" });

Producto.hasMany(PrecioCliente, { foreignKey: "id_producto" });
PrecioCliente.belongsTo(Producto, { foreignKey: "id_producto" });
