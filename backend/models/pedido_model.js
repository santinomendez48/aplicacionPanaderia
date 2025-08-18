import sequelize from "../.data/db.js";
import { DataTypes, Model } from "sequelize";

class Pedido extends Model {}

Pedido.init(
    {
        idPedido: {
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
        fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        pagado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false // Valor por defecto para indicar si el pedido ha sido pagado
        }
    },
    {
        sequelize: sequelize,
        modelName: 'Pedido',
        tableName: 'Pedidos',
        timestamps: false
    }
);

export default Pedido;
