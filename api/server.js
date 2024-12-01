const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/users');
const vagasController = require('./controllers/vagas');
const sequelize = require('./db'); // Conexão com o banco de dados
const User = require('./models/User'); // Modelo de Usuário
const Vaga = require('./models/Vaga'); // Modelo de Vaga

const app = express(); 
const port = 3000;
const bcrypt = require('bcrypt');

// Middleware para parsear o corpo da requisição como JSON
app.use(bodyParser.json());

// ----- Rotas de Usuários -----
app.post('/usuarios', async (req, res) => {
    try {
        const user = await usersController.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error.message === 'E-mail já está em uso') {
            return res.status(409).json({ message: 'E-mail já está em uso. Por favor, use outro e-mail.' });
        }
        res.status(500).send('Erro ao criar usuário');
    }
});


app.get('/usuarios/:id?', async (req, res) => {
    try {
        const user = await usersController.findUsers(req.params.id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Erro ao buscar usuário');
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, email, senha } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'ID do usuário é necessário.' });
    }

    try {
        const user = await usersController.updateUser(id, { nome, email, senha });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.status(200).json(user);
    } catch (error) {
        // Verifica se o erro é relacionado ao e-mail
        if (error.message === 'E-mail já está em uso') {
            return res.status(409).json({ message: 'E-mail já está em uso. Por favor, use outro e-mail.' });
        }

        // Outros erros do servidor
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const success = await usersController.removeUser(req.params.id);
        if (!success) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Erro ao remover usuário');
    }
});

// ----- Rotas de Vagas -----
app.post('/vagas', async (req, res) => {
    try {
        const vaga = await vagasController.createVaga(req.body);
        res.status(201).json(vaga);
    } catch (error) {
        res.status(500).send('Erro ao criar vaga');
    }
});

app.get('/vagas/:id?', async (req, res) => {
    try {
        const vaga = await vagasController.findVagas(req.params.id);
        if (!vaga) {
            return res.status(404).send('Vaga não encontrada');
        }
        res.json(vaga);
    } catch (error) {
        res.status(500).send('Erro ao buscar vaga');
    }
});

app.put('/vagas/:id', async (req, res) => {
    try {
        const vaga = await vagasController.updateVaga(req.params.id, req.body);
        if (!vaga) {
            return res.status(404).send('Vaga não encontrada');
        }
        res.json(vaga);
    } catch (error) {
        res.status(500).send('Erro ao atualizar vaga');
    }
});

app.delete('/vagas/:id', async (req, res) => {
    try {
        const success = await vagasController.removeVaga(req.params.id);
        if (!success) {
            return res.status(404).send('Vaga não encontrada');
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Erro ao remover vaga');
    }
});

// ----- Rota de Login -----
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await User.findOne({ where: { email } }); // Busca no banco
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordCorrect = await bcrypt.compare(senha, user.senha); // Compara senha
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        res.status(200).json({ user }); // Retorna o usuário autenticado
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


//Sincronizando o banco de dados antes de iniciar o servidor
sequelize.sync({ force: false })
    .then(() => {
        console.log('Banco de dados sincronizado.');
        app.listen(port, () => {
            console.log(`Servidor rodando em {IP DA SUA REDE}:${port}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados:', err);
    });
