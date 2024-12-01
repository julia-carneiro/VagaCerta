import { Image } from 'react-native';
import { useState } from 'react';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import api from '../../services/api';

import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { email, senha });
            if (response.status === 200) {
                const jsonValue = JSON.stringify(response.data.user);
                await AsyncStorage.setItem('user', jsonValue); // Salva o usuário no AsyncStorage
                navigation.navigate('Auth', { screen: 'Home' }); // Navega para a tela principal
            }
        } catch (error) {
            console.log('Erro no login: ', error.response ? error.response.data : error.message);
            const message = error.response && error.response.data ? error.response.data.message : error.message;
            setErrorMessage(message); // Mostra mensagem de erro
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />
            <Container>
                <Form>
                    <Logo />
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
                    {errorMessage ? (
                        <TextContainer>
                            <TextBlack style={{ color: 'red' }}>{errorMessage}</TextBlack>
                        </TextContainer>
                    ) : null}
                    <Button
                        title="Entrar"
                        noSpacing={true}
                        variant="primary"
                        onPress={handleLogin}
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
                            <TextLink>Crie agora mesmo.</TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>
            </Container>
        </Wrapper>
    );
}
