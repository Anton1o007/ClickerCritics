import styled from "styled-components";
import { FaTrash } from "react-icons/fa";

export const AddGameButtonContainer = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

export const DeleteButton = styled(FaTrash)`
  font-size: 20px;
  color: ${props => props.theme.nord.red};
`;

export const ConfirmationBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConfirmationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  gap: 20px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const TitleInfo = styled.p`
  color: ${props => props.theme.nord.dark1};
  font-family: 'proxima-nova-bold', sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const TextInfo = styled.p`
  max-width: 300px;
  text-align: justify;
  color: ${props => props.theme.nord.dark1};
  font-family: 'proxima-nova-regular', sans-serif;
  font-size: 16px;
  margin-bottom: 10px;
`;

interface ConfirmButtonProps {
  disabled?: boolean;
}

export const ConfirmButton = styled.button<ConfirmButtonProps>`
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: ${props => props.theme.nord.light0};
  background-color: ${props => props.theme.nord.dark1};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.theme.nord.green};
  }

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button<ConfirmButtonProps>`
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: ${props => props.theme.nord.light0};
  background-color: ${props => props.theme.nord.dark1};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.theme.nord.red};
  }
`;


interface StatusProps {
  $status: string;
}

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  align-content: center;
  gap: 20px;
`;

export const StatusButton = styled.button<{ withBorder?: boolean } & StatusProps>`
  width: 110px;
  padding: 5px 10px;
  border-radius: 5px;
  border: ${({ withBorder }) => withBorder ? 'solid 2px' : 'none'};
  margin: 0;
  color: ${props => props.theme.nord.dark1};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 14px;
  background-color: ${props => {
    switch (props.$status) {
      case 'NOT_STARTED':
        return props.theme.nord.light_grey;
      case 'IN_PROGRESS':
        return props.theme.nord.orange;
      case 'COMPLETED':
        return props.theme.nord.green;
      default:
        return 'transparent';
    }
  }};
  
  &:before {
    content: "${props => getStatusText(props.$status)}";
    display: block;
  }
`;
const getStatusText = (status: string): string => {
  switch (status) {
    case 'NOT_STARTED':
      return 'NO EMPEZADO';
    case 'IN_PROGRESS':
      return 'EN CURSO';
    case 'COMPLETED':
      return 'TERMINADO';
    default:
      return status.replace(/_/g, ' ');
  }
};

