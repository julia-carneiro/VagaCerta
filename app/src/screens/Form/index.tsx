import React, { useState } from 'react';
import { Image } from 'react-native';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api'; // Serviço de API
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para armazenar os dados localmente, caso necessário

export default function FormScreen({ navigation }) {
    // Estados para o formulário
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // Função de cadastro
    const handleRegister = async () => {
        if (!nome || !email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            // Dados a serem enviados para a API
            const userData = {
                nome,
                email,
                senha,
            };

            // Envia a requisição para a API
            const response = await api.post('/usuarios', userData); // Rota de cadastro, ajuste conforme sua API

            if (response.status === 201) {
                // Armazenando os dados do usuário localmente (se necessário)
                await AsyncStorage.setItem('user', JSON.stringify(response.data));

                alert('Cadastro realizado com sucesso!');
                // Navegando para a tela de login após o sucesso
                navigation.navigate('Login');
            }
        } catch (error) {
            console.error('Erro ao realizar o cadastro:', error);
            alert('Erro ao cadastrar, tente novamente.');
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} style={{ width: '100%', height: '50%' }} />

            <Container>
                <Form>
                    <Logo />
                    <Input
                        label="Nome"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChangeText={setNome}
                    />
                    <Input
                        label="E-mail"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                    />
                    <Button
                        title="Cadastrar"
                        noSpacing={true}
                        variant="primary"
                        onPress={handleRegister} // Chama a função de cadastro
                    />
                    <TextContainer>
                        <TextBlack>Já tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('Login')}>
                            <TextLink>Faça seu login.</TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>
            </Container>
        </Wrapper>
    );
}
