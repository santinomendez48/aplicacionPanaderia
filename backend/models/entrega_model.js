import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Entrega = sequelize.define("Entrega", {
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

    return Entrega;
};