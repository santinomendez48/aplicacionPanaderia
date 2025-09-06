import { DataTypes } from "sequelize";

export default (sequelize) => {
    const CuentaCliente = sequelize.define("CuentaCliente", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        total_dia: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        pago: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        saldo_anterior: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        saldo_actual: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        entrega_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "cuenta_cliente",
        timestamps: false
    });

    return CuentaCliente;
};
