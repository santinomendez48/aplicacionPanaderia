import { DataTypes } from "sequelize";

export default (sequelize) => {
    const CuentaCliente = sequelize.define("CuentaCliente", {
        id_movimiento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo_movimiento: {
            type: DataTypes.ENUM("DEBITO", "CREDITO"),
            allowNull: false
        },
        monto: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        metodo_pago: {
            type: DataTypes.STRING,
            allowNull: true
        },
        observaciones: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: "cuenta_cliente",
        timestamps: false
    });

    return CuentaCliente;
};
