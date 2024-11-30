import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Header,
    HeaderButtonContainer,
    ButtonIcon,
    ButtonText,
    ContentContainer,
    Title,
    Description,
    InfoContainer,
    InfoRow,
    InfoLabel,
    InfoValue,
    StatusBadge,
    StatusText,
    DateText,
    ColoredContainer
} from '../Details/styles';
import { Linking } from 'react-native';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';
import { VagasProps } from '../../utils/Types';
import api from '../../services/api';

export default function Details({ route, navigation }) {
    const [vaga, setVaga] = useState<VagasProps | null>(null);
    const id = route.params.id; // Acessando o ID diretamente do route

    const fetchVaga = async (id: number) => { 
        try {
            const response = await api.get(`/vagas/${id}`);
            const data = response.data;

            if (data) {
                setVaga({
                    id: data.id,
                    titulo: data.titulo,
                    descricao: data.descricao,
                    dataCadastro: data.dataCadastro,
                    telefone: data.telefone,
                    status: data.status,
                    empresa: data.empresa
                });
            }
        } catch (error) {
            console.log('Erro ao buscar vaga:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchVaga(id);
        }
    }, [id]);

    //Função para formatar a data de cadastro
    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('pt-BR', options);
    };

    //Função para formatar o status (cor e formato)
    const formatStatus = (status: string) => {
        const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        return capitalizedStatus;
    };

    // Função para abrir o WhatsApp com o número correto
    const handleContactPress = () => {
      const phone = vaga?.telefone; // Obtendo o telefone da vaga
      if (phone) {
          // Garantindo que o número tenha o formato internacional
          const formattedPhone = `+55${phone.replace(/\D/g, '')}`; // Remove caracteres não numéricos
          const url = `whatsapp://send?phone=${formattedPhone}`;
          Linking.openURL(url)
              .catch(err => console.error('Erro ao abrir WhatsApp:', err));
      }
  };

    return (
        <Wrapper>
          <Header>
            <HeaderButtonContainer onPress={() => navigation.goBack()}>
              <ButtonIcon>
                <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
              </ButtonIcon>
              <ButtonText>Voltar</ButtonText>
            </HeaderButtonContainer>
            <Logo />
          </Header>
      
          {vaga ? (
            <ContentContainer>
              <Title>{vaga.titulo}</Title>
              <InfoContainer>
                <InfoRow>
                  <InfoLabel>Status:</InfoLabel>
                  <StatusBadge status={vaga.status}>
                    <StatusText>{formatStatus(vaga.status)}</StatusText>
                  </StatusBadge>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Data de Cadastro:</InfoLabel>
                  <DateText>{formatDate(vaga.dataCadastro)}</DateText>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Empresa:</InfoLabel>
                  <InfoValue>{vaga.empresa}</InfoValue>
                </InfoRow>
              </InfoContainer>
              <ColoredContainer>
                <Description>{vaga.descricao}</Description>
              </ColoredContainer>
              {vaga.status.toLowerCase() === 'aberta' && (
                <Button 
                  title="Entrar em contato" 
                  noSpacing={true} 
                  variant='primary'
                  onPress={handleContactPress}
                />
              )}
            </ContentContainer>
          ) : (
            <Title>Vaga não encontrada.</Title>
          )}
        </Wrapper>
    );
}
