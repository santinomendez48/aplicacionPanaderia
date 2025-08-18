import sequelize from "../.data/db.js";
import { DataTypes, Model } from "sequelize";

class CuentaCliente extends Model {}

CuentaCliente.init(
    {
        idCuentaCliente: {
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
        saldo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00 // Valor por defecto para el saldo de la cuenta
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW // Valor por defecto para la fecha de creación de la cuenta
        }
    },
    {
        sequelize: sequelize,
        modelName: 'CuentaCliente',
        tableName: 'CuentasClientes',
        timestamps: false
    }
);

export default CuentaCliente;
