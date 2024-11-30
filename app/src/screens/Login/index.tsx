import { Image } from 'react-native';
import { useState } from 'react';
import { Wrapper, Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import api from '../../services/api'; 

import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Adiciona o estado para o erro

    const handleLogin = async () => {
        try {
            const response = await api.post('/login', { email, senha });
            
            if (response.status === 200) {
                //console.log('Login bem-sucedido');
                navigation.navigate('Auth', {screen: 'Home'}); // Navegação após login bem-sucedido
            }
        } catch (error) {
            const message = error.response ? error.response.data : error.message;
            setErrorMessage(message); // Atualiza o estado com a mensagem de erro
            //console.log('Erro no login: ', message);
        }
    };

    return (
        <Wrapper>
            <Image source={BGTop} />
            <Container>
                <Form>
                    <Logo />
                    <Input 
                        label='E-mail' 
                        placeholder='digite seu e-mail'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input 
                        label='Senha' 
                        placeholder='digite sua senha'
                        value={senha}
                        onChangeText={setSenha}
                    />
                    
                    {/* Exibe a mensagem de erro, se houver */}
                    {errorMessage ? (
                        <TextContainer>
                            <TextBlack style={{ color: 'red' }}>{errorMessage}</TextBlack>
                        </TextContainer>
                    ) : null}

                    <Button 
                        title="Entrar" 
                        noSpacing={true} 
                        variant='primary'
                        onPress={() => navigation.navigate('Auth', {screen: 'Home'})} //DEBUG
                        //onPress={handleLogin}
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
                            <TextLink>
                                Crie agora mesmo.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>
            </Container>
        </Wrapper>
    );
}
