const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Vaga = sequelize.define('Vaga', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    dataCadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Ativo',
    },
    empresa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Vaga;
