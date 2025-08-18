import sequelize from "../.data/db.js";
import { DataTypes, Model } from "sequelize";

class PreciosClientes extends Model {}

PreciosClientes.init(
    {
        idPrecioCliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Clientes', // Nombre de la tabla referenciada
                key: 'idCliente' // Clave primaria de la tabla referenciada
            }
        },
        idProducto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Productos', // Nombre de la tabla referenciada
                key: 'idProducto' // Clave primaria de la tabla referenciada
            }
        },
        precioVenta: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, 
    {
        sequelize: sequelize,
        modelName: 'PreciosClientes',
        tableName: 'PreciosClientes',
        timestamps: false
    }
);

export default PreciosClientes;
