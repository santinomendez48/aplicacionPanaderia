import sequelizeConfig from "../.data/base_config";
import { DataTypes, Model } from "sequelize";

class PedidoProducto extends Model {}

PedidoProducto.init(
    {
        idPedidoProducto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idPedido: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Pedidos', // Nombre de la tabla referenciada
                key: 'idPedido' // Clave primaria de la tabla referenciada
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
        cantidad: {
            type: DataTypes.INTEGER,    
            allowNull: false
        }
    },
    {
        sequelize: sequelizeConfig, 
        modelName: 'PedidoProducto',
        tableName: 'PedidosProductos',
        timestamps: false
    }
);

export default PedidoProducto;
