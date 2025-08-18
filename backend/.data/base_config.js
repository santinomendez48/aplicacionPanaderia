import { Sequelize } from 'sequelize';

// Configuración base de datos SQLite
const sequelizeConfig = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Ruta al archivo de la base de datos SQLite
    define: {
        timestamps: false, // Desactivar timestamps si no se necesitan
        freezeTableName: true // Evitar pluralización automática de nombres de tablas
    }
});

export default sequelizeConfig;