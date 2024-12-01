import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.13:3000' //POR FAVOR, ALTERE 'localhost' PARA O IP DA SUA REDE
});

export default api;