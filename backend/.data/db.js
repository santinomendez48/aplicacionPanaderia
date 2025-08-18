import { Sequelize } from 'sequelize';

// Configuración base de datos SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '.data/databse.sqlite', // Ruta al archivo de la base de datos SQLite
    define: {
        timestamps: false, // Desactivar timestamps si no se necesitan
        freezeTableName: true // Evitar pluralización automática de nombres de tablas
    }
});

export default sequelize;