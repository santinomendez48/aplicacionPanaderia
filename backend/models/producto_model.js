import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Producto = sequelize.define("Producto", {
        id_producto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, 
    {
        tableName: "productos",
        timestamps: false
    });

    return Producto;
};
