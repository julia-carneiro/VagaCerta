const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser({ nome, email, senha }) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome, email, senha: hashedPassword });
    return user;
}

async function findUsers(id = null) {
    if (id) {
        return User.findByPk(id);
    }
    return User.findAll();
}

async function findUsersByEmail(email) {
    return User.findOne({ where: { email } });
}

async function updateUser(id, data) {
    // Busca o usuário pelo ID
    const user = await User.findByPk(id);
    if (!user) {
        return null; // Retorna null se o usuário não for encontrado
    }

    // Se a senha foi enviada, criptografa antes de salvar
    if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 10);
    } else {
        // Remove o campo senha do objeto data para evitar sobrescrita
        delete data.senha;
    }

    // Atualiza os campos restantes
    await user.update(data);
    return user; // Retorna o usuário atualizado
}


async function removeUser(id) {
    const user = await User.findByPk(id);
    if (!user) return false;

    await user.destroy();
    return true;
}

module.exports = { createUser, findUsers, findUsersByEmail, updateUser, removeUser };
