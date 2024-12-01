const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./users'); // Importa as funções de usuários
const vagasController = require('./vagas'); // Importa as funções de vagas

const app = express();
const port = 3000;

// Middleware para parsear o corpo da requisição como JSON
app.use(bodyParser.json());

// ----- Rotas de Usuários -----

// Rota para criar um usuário
app.post('/usuarios', async (req, res) => {
    try {
        const user = await usersController.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).send('Erro ao criar usuário');
    }
});

// Rota para buscar um usuário (ou todos)
app.get('/usuarios/:id?', (req, res) => {
    const user = usersController.findUsers(req.params.id);
    if (!user) {
        return res.status(404).send('Usuário não encontrado');
    }
    res.json(user);
});

// Rota para editar um usuário
app.put('/usuarios/:id', async (req, res) => {
    try {
        const user = await usersController.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('Erro ao atualizar usuário');
    }
});

// Rota para remover um usuário
app.delete('/usuarios/:id', (req, res) => {
    const success = usersController.removeUser(req.params.id);
    if (!success) {
        return res.status(404).send('Usuário não encontrado');
    }
    res.status(204).send(); // Retorna status 204 sem conteúdo
});

// ----- Rotas de Vagas -----

// Rota para criar uma vaga
app.post('/vagas', (req, res) => {
    const vaga = vagasController.createVaga(req.body);
    res.status(201).json(vaga);
});

// Rota para editar uma vaga
app.put('/vagas/:id', (req, res) => {
    const vaga = vagasController.updateVaga(req.params.id, req.body);
    if (!vaga) {
        return res.status(404).send('Vaga não encontrada');
    }
    res.json(vaga);
});

// Rota para remover uma vaga
app.delete('/vagas/:id', (req, res) => {
    const success = vagasController.removeVaga(req.params.id);
    if (!success) {
        return res.status(404).send('Vaga não encontrada');
    }
    res.status(204).send(); // Retorna status 204 sem conteúdo
});

// Rota para buscar vagas, podendo especificar um id
app.get('/vagas/:id?', (req, res) => {
    const vaga = vagasController.findVagas(req.params.id);
    if (!vaga) {
        return res.status(404).send('Vaga não encontrada');
    }
    res.json(vaga);
});

// ----- Rota de Login -----

app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await user.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const isPasswordCorrect = await user.comparePassword(senha);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
