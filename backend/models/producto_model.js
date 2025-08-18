import sequelizeConfig from "../.data/base_config";
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
        sequelizeConfig,
        modelName: 'Producto',
        tableName: 'Productos',
        timestamps: false
    }
);

export default Producto;
