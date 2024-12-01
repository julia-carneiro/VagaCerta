const { Sequelize } = require('sequelize');

// Configuração do SQLite usando Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // Caminho do arquivo do banco de dados
    logging: false // Evita logs no console
});

module.exports = sequelize;
