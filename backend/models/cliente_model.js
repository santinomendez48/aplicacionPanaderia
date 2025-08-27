import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Cliente = sequelize.define("Cliente", {
        id_cliente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, 
    {
        tableName: "clientes",
        timestamps: false
    });

    return Cliente;
};
