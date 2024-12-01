import React, {useState, useEffect} from 'react';
import { Image, FlatList, View, Text } from 'react-native';
import { Wrapper,Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import VagaCard from '../../components/VagaCard';
import api from '../../services/api'; 

export default function List() {

    const [vagas, setVagas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchVagas = async () => {
        try{
          const response = await api.get('/vagas');
          setVagas(response.data);
        }catch(error){
          console.log(error)
        }
        finally{
          setIsLoading(false);
        }
      } 

      fetchVagas();
      
        const interval = setInterval(() => {
            fetchVagas();
        }, 30000); // Atualiza a cada 30 segundos
    
        return () => clearInterval(interval); 
    
    }, [])

    const formatDate = (date: string) => {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    };

    return (
        <Wrapper>
            <Image source={BGTop} style={{maxHeight: 86}}/>
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
                        renderItem={({item}) => 
                        <VagaCard
                          id={item.id}
                          title={item.titulo} 
                          dataCreated={formatDate(item.dataCadastro)}
                          company={item.empresa}
                        />
                        }
                        showsVerticalScrollIndicator={true}
                        ListEmptyComponent={() => (
                          <View>
                                <Text>
                                    Ainda não existem  vagas cadastradas
                                </Text>
                                <Text>
                                    Em breve novas vagas chegarão para você!
                                </Text>
                            </View>
                        )}
                        />
                      )}
                </ListContainer>

            </Container>
        </Wrapper>
    );
}
