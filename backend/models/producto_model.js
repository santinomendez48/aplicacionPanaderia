import sequelize from "../.data/db.js";
import { DataTypes, Model } from "sequelize";

class Producto extends Model {};

Producto.init(
    {
        idProducto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        costo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Producto',
        tableName: 'Productos',
        timestamps: false
    }
);

export default Producto;
