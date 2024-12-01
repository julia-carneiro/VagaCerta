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
    const user = await User.findByPk(id);
    if (!user) return null;

    if (data.senha) {
        data.senha = await bcrypt.hash(data.senha, 10);
    }

    await user.update(data);
    return user;
}

async function removeUser(id) {
    const user = await User.findByPk(id);
    if (!user) return false;

    await user.destroy();
    return true;
}

module.exports = { createUser, findUsers, findUsersByEmail, updateUser, removeUser };
