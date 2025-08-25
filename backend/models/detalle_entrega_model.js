import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define("DetalleEntrega", {
        id_detalle: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
};