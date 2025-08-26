import { DataTypes } from "sequelize";

export default (sequelize) => {
    const PrecioCliente = sequelize.define("PrecioCliente", {
        id_precio: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // FK a cliente y producto (relaciones en index.js)
        precio_especial: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, 
    {
        tableName: "precios_clientes",
        timestamps: false,
        indexes: [
            // Para evitar duplicados: un cliente solo puede tener 1 precio por producto
            { unique: true, fields: ["id_cliente", "id_producto"] }
        ]
    });

    return PrecioCliente;
};
