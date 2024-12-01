import { styled } from 'styled-components/native';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};  /* Cor de fundo mais clara */
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  padding-top: 45px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.GREEN};
`;

export const HeaderButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`;

export const ButtonIcon = styled.View``;

export const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.BLUE};
`;

export const ContentContainer = styled.View`
  width: 100%;
  gap: 16px;
  padding: 16px; 
`;

export const ColoredContainer = styled.View`
  background-color: ${({ theme }) => theme.COLORS.GRAY_02};
  padding: 16px;
  border-radius: 8px;
  margin: 8px 0;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.LG}px;
  font-weight: 700;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const Description = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

export const InfoContainer = styled.View`
  width: 100%;
  padding: 8px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;  
  padding: 8px 0;
`;

export const InfoLabel = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.GRAY};
`;

export const InfoValue = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.BLACK};
`;

interface StatusBadgeProps {
  status: 'aberta' | 'encerrada'; 
}

export const StatusBadge = styled.View<StatusBadgeProps>`
  background-color: ${({ status, theme }) => 
    status === 'aberta' ? theme.COLORS.GREEN : theme.COLORS.RED};
  padding: 4px 8px;
  border-radius: 8px;
`;

export const StatusText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.WHITE};  
`;

export const DateText = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  color: ${({ theme }) => theme.COLORS.GRAY};
`;
