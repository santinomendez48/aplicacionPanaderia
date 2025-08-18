import sequelize from "../.data/db.js";
import { DataTypes, Model } from "sequelize";

class PagosClientes extends Model {}

PagosClientes.init(
    {
        idPagoCliente: {
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
        fechaPago: {
            type: DataTypes.DATE,
            allowNull: false
        },
        monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false    
        },
        metodoPago: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },  
    {
        sequelize: sequelize,
        modelName: 'PagosClientes',
        tableName: 'PagosClientes',
        timestamps: false
    }
);  

export default PagosClientes;
