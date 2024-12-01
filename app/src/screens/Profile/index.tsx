import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
} from '../Profile/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import Input from '../../components/Input'
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';


export default function Profile({navigation }) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        const getUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user');
                const user = JSON.parse(jsonValue); // Parseia o JSON para obter o objeto
                
                if (user) {
                    setId(user.id);
                    setEmail(user.email);
                    setNome(user.nome);
                    setSenha(user.senha); // Apenas para fins de demonstração
                }
            } catch (error) {
                console.error('Erro ao recuperar dados do usuário:', error);
            }
        };
        getUser();
    }, []);
    
    
    const handleSave = async () => {
        try {
            const user = { id, email, nome, senha };
            await AsyncStorage.setItem('user', JSON.stringify(user));
            alert('Informações salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
        }
    };
    

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>
                        Voltar
                    </ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>

            <Container>
                <ContentContainer>
                    <Input label='Nome' placeholder='digite seu nome' value={nome} onChangeText={setNome} />
                    <Input label='E-mail' placeholder='digite seu e-mail' value={email} onChangeText={setEmail} />
                    <Input label='Senha' placeholder='digite sua senha' value={senha} onChangeText={setSenha} />
                </ContentContainer>

                <Button 
                    title="Salvar informações" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={handleSave}
                />
            </Container>
        </Wrapper>
    );
}
