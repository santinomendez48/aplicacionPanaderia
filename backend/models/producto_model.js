import sequelize from "../.data/base_config";
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
        precio: {
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
