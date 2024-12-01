const { Sequelize } = require('sequelize');

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Nome do arquivo SQLite
    logging: false, // Desativa logs de SQL no console
});

module.exports = sequelize;
