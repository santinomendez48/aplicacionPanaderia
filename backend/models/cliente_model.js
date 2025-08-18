import sequelize from "../.data/base_config";
import { DataTypes, Model } from "sequelize";

class Cliente extends Model {};

Cliente.init(
    {
        idCliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Cliente',
        tableName: 'Clientes',
        timestamps: false
    }
);

export default Cliente;
