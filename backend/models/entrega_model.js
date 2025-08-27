import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Entrega = sequelize.define("Entrega", {
        id_entrega: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha_entrega: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            unique: true
        }
    }, 
    {
        tableName: "entregas",
        timestamps: false
    });

    return Entrega;
};