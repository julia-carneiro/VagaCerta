const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser({ nome, email, senha }) {
    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('E-mail já está em uso');
    }

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
    const user = await User.findByPk(id);
    if (!user) {
        return null; // Retorna null se o usuário não for encontrado
    }

    // Verifica se o e-mail enviado já está em uso (mas ignorando o próprio usuário)
    if (data.email) {
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser && existingUser.id !== id) {
            throw new Error('E-mail já está em uso');
        }
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
