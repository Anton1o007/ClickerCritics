import styled from 'styled-components';

export const SessionExpiredPopup = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopupContent = styled.div`
  padding: 50px 30px;
  background: ${props => props.theme.nord.light3};
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  align-items: center;
  align-content: center;
  text-align: center;
  color: black;
`;

export const Title = styled.h2`
  font-size: 24px;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  padding: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const RenewSessionButton = styled.button`
  background-color: ${props => props.theme.nord.dark1};
  color: ${props => props.theme.nord.light0};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.nord.green};
  }
`;

export const LogoutButton = styled.button`
  background-color: ${props => props.theme.nord.dark1};
  color: ${props => props.theme.nord.light0};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.nord.red};
  }
`;