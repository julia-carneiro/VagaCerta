import React, { useState, useEffect } from 'react';
import { Image, FlatList, View, Text, RefreshControl } from 'react-native';
import { Wrapper, Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import VagaCard from '../../components/VagaCard';
import api from '../../services/api';

export default function List() {
  const [vagas, setVagas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para controle do pull-to-refresh

  const fetchVagas = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/vagas');
      setVagas(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVagas();
    const interval = setInterval(() => {
      fetchVagas();
    }, 60000); // Atualiza a cada 60 segundos caso voce nao de refresh
    return () => clearInterval(interval);
  }, []);

  // Função chamada ao puxar para atualizar
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchVagas(); // Atualiza as vagas ao puxar para baixo
    setRefreshing(false);
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  return (
    <Wrapper>
      <Image source={BGTop} style={{ maxHeight: 86 }} />
      <Container>
        <Logo />
        <TextVagas>{vagas.length} vagas encontradas!</TextVagas>
        <ListContainer>
          {isLoading ? (
            <Text>Carregando...</Text>
          ) : (
            <FlatList
              data={vagas}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <VagaCard
                  id={item.id}
                  title={item.titulo}
                  dataCreated={formatDate(item.dataCadastro)}
                  company={item.empresa}
                />
              )}
              showsVerticalScrollIndicator={true}
              ListEmptyComponent={() => (
                <View>
                  <Text>Ainda não existem vagas cadastradas</Text>
                  <Text>Em breve novas vagas chegarão para você!</Text>
                </View>
              )}
              // Adiciona o RefreshControl aqui
              refreshControl={
                <RefreshControl
                  refreshing={refreshing} // Controle de carregamento
                  onRefresh={onRefresh} // Função chamada ao puxar para baixo
                />
              }
            />
          )}
        </ListContainer>
      </Container>
    </Wrapper>
  );
}
