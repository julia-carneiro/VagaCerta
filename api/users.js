const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

let users = []; //Armazena usuários temporariamente

// Função para gerar o hash da senha
async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// Função para verificar se a senha fornecida corresponde ao hash armazenado
async function checkPassword(storedHash, password) {
    const isMatch = await bcrypt.compare(password, storedHash);
    return isMatch;
}

// Função para criar um usuário
async function createUser({ nome, email, senha }) {
    const hashedPassword = await hashPassword(senha);
    const user = {
        id: uuidv4(),
        nome,
        email,
        senha: hashedPassword,
    };
    users.push(user);
    return user;
}

// Função para buscar usuários
function findUsers(id = null) {
    if (id === null) {
        return users;
    }
    const user = users.find(user => user.id === id);
    return user || null;
}

// Função para buscar usuário por email
function findUsersByEmail(email) {
    return users.find(user => user.email === email);
}

// Função para atualizar usuário
async function updateUser(id, { nome, email, senha }) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return null;

    let hashedPassword = users[index].senha;
    if (senha) {
        hashedPassword = await hashPassword(senha);
    }

    users[index] = { id, nome, email, senha: hashedPassword };
    return users[index];
}

// Função para remover usuário
function removeUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
}

module.exports = { createUser, findUsers, updateUser, removeUser, checkPassword, findUsersByEmail };
