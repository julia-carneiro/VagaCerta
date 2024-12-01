const Vaga = require('../models/Vaga');

// Função para criar uma vaga
async function createVaga({ titulo, descricao, dataCadastro, telefone, status, empresa }) {
    const vaga = await Vaga.create({
        titulo,
        descricao,
        dataCadastro: dataCadastro || new Date(),
        telefone,
        status: status || 'Ativo',
        empresa,
    });
    return vaga;
}

// Função para buscar vagas
async function findVagas(id = null) {
    if (id) {
        return Vaga.findByPk(id);
    }
    return Vaga.findAll();
}

// Função para atualizar vaga
async function updateVaga(id, { titulo, descricao, dataCadastro, telefone, status, empresa }) {
    const vaga = await Vaga.findByPk(id);
    if (!vaga) return null;

    await vaga.update({
        titulo: titulo || vaga.titulo,
        descricao: descricao || vaga.descricao,
        dataCadastro: dataCadastro || vaga.dataCadastro,
        telefone: telefone || vaga.telefone,
        status: status || vaga.status,
        empresa: empresa || vaga.empresa,
    });

    return vaga;
}

// Função para remover vaga
async function removeVaga(id) {
    const vaga = await Vaga.findByPk(id);
    if (!vaga) return false;

    await vaga.destroy();
    return true;
}

module.exports = { createVaga, findVagas, updateVaga, removeVaga };
