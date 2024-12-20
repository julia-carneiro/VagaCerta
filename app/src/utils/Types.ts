export type VagasProps = {
    id: string;          
    titulo: string;      
    descricao: string;   
    dataCadastro: string; 
    telefone: string;    
    status: 'aberta' | 'encerrada';      
    empresa: string;     
};

export type RootStackParamList = {
    Login: undefined;
    FormScreen: undefined;
    Home: undefined;
    Profile: undefined;
    Details: {id: number};
};