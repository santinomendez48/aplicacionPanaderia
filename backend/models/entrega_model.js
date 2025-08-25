import { DataTypes } from "sequelize";

export default (sequelize) => {
    return sequelize.define("Entrega", {
        id_entrega: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, 
    {
        tableName: "entregas",
        timestamps: false
    });
};