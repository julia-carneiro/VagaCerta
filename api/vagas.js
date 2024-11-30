const { v4: uuidv4 } = require('uuid');

let vagas = []; // Armazena vagas temporariamente

// Função para criar uma vaga
function createVaga({ titulo, descricao, dataCadastro, telefone, status, empresa }) {
    const vaga = {
        id: uuidv4(),
        titulo,
        descricao,
        dataCadastro,
        telefone,
        status,
        empresa,
    };
    vagas.push(vaga);
    return vaga;
}

// Função para buscar vagas
function findVagas(id = null) {
    if (id === null) {
        return vagas;
    }
    const vaga = vagas.find(vaga => vaga.id === id);
    return vaga || null;
}

// Função para atualizar vaga
function updateVaga(id, { titulo, descricao, dataCadastro, telefone, status, empresa }) {
    const index = vagas.findIndex(vaga => vaga.id === id);
    if (index === -1) return null;

    vagas[index] = { id, titulo, descricao, dataCadastro, telefone, status, empresa };
    return vagas[index];
}

// Função para remover vaga
function removeVaga(id) {
    const index = vagas.findIndex(vaga => vaga.id === id);
    if (index === -1) return false;

    vagas.splice(index, 1);
    return true;
}

module.exports = { createVaga, findVagas, updateVaga, removeVaga };
