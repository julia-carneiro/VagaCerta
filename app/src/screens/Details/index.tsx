import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
    Title,
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { VagasProps } from '../../utils/Types';
import api from '../../services/api';


export default function Details({route, navigation }) {

    const [id, setId] = useState(route.params.id)
    const [vaga, setVaga] = useState<VagasProps>(null)

    const fetchVaga = async (id) => { 
        try {
            const response = await api.get(`/vagas/${id}`); // Corrigir interpolação
            const data = response.data;
            setVaga({
                id: data.id,
                titulo: data.titulo,
                descricao: data.descricao,
                dataCadastro: data.dataCadastro,
                telefone: data.telefone,
                status: data.status,
                empresa: data.empresa
            });
        } catch (error) {
            console.log(error);
        }
    };
    

    useEffect(() => {
        fetchVaga(id);
    },[id])

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

            {vaga ? (
                 <Container>
                    <ContentContainer>
                        <Title>{vaga.titulo}</Title>
                        <Description>{vaga.descricao}</Description>
                    </ContentContainer>
    
                    <Button 
                        title="Entrar em contato" 
                        noSpacing={true} 
                        variant='primary'
                        />
             </Container>
            ) : (
                <Title>Vaga não encontrada.</Title>
            )}

           
        </Wrapper>
    );
}
