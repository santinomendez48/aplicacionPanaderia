import { DataTypes } from "sequelize";

export default (sequelize) => {
    const DetalleEntrega = sequelize.define("DetalleEntrega", {
        id_detalle: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        id_entrega: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_producto: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_unitario: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, 
    {
        tableName: "detalles_entrega",
        timestamps: false
    });

    return DetalleEntrega;
};