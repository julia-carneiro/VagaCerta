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
    const [senhaOriginal, setSenhaOriginal] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        const getUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user');
                let user = JSON.parse(jsonValue); 
                
                const response = await api.get(`/usuarios/${user.id}`)
                user = response.data;

                if (user) {
                    setId(user.id);
                    setEmail(user.email);
                    setNome(user.nome);
                    setSenha(''); // Limpa a senha para segurança
                    setSenhaOriginal(user.senha); // Armazena a senha original
                }
            } catch (error) {
                console.error('Erro ao recuperar dados do usuário:', error);
            }
        };
        getUser();
    }, []);

    const handleEdit = async () => {
        try {
            // Cria o objeto de atualização
            const updatedData = {
                id,
                nome,
                email,
            };

            // Verifica se a senha foi alterada
            if (senha && senha !== senhaOriginal) {
                updatedData.senha = senha; // Adiciona a senha apenas se alterada
            }

            // Atualiza os dados no AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(updatedData)); 

            // Faz a requisição de atualização
            const response = await api.put(`/usuarios/${id}`, updatedData);

            if (response.status === 200) {
                alert('Informações salvas com sucesso!');
                navigation.navigate('Auth', { screen: 'Home' });
            }
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
                    <Input 
                        label='Senha' 
                        placeholder='digite sua senha' 
                        value={senha} 
                        onChangeText={setSenha} 
                        secureTextEntry
                    />
                </ContentContainer>

                <Button
                    title="Salvar informações"
                    noSpacing={true}
                    variant='primary'
                    onPress={handleEdit}
                />
            </Container>
        </Wrapper>
    );
}
