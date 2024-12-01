import React, { useState } from 'react';
import { Image } from 'react-native';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function FormScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleRegister = async () => {
        if (!nome || !email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const userData = { nome, email, senha };

            const response = await api.post('/usuarios', userData);

            if (response.status === 201) {
                await AsyncStorage.setItem('user', JSON.stringify(response.data));

                alert('Cadastro realizado com sucesso!');
                navigation.navigate('Login');
            }
        } catch (error) {
            if (error.response) {
                // Verifica se o erro veio do servidor
                if (error.response.status === 409) {
                    // Código 409: Conflito (e-mail já cadastrado)
                    alert('Este e-mail já está em uso. Por favor, use outro e-mail.');
                } else if (error.response.status === 400) {
                    // Código 400: Solicitação inválida
                    alert('Dados inválidos. Verifique as informações e tente novamente.');
                } else {
                    // Outros erros do servidor
                    alert(`Erro no servidor: ${error.response.data.message || 'Tente novamente mais tarde.'}`);
                }
            } else {
                // Erros de rede ou outros problemas não relacionados ao back-end
                alert('Erro ao cadastrar. Verifique sua conexão com a internet.');
            }

            console.error('Erro ao realizar o cadastro:', error);
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
                        onPress={handleRegister}
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
