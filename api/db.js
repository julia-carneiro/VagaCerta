const { Sequelize } = require('sequelize');

// Configuração do SQLite usando Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', 
    logging: false 
});

module.exports = sequelize;
