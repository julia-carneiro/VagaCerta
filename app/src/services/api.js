import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000' //POR FAVOR, ALTERE 'localhost' PARA O IP DA SUA REDE
});

export default api;