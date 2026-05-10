import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  max-width: 800px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 100px 20px  20px 100px;
  padding: 8px 10px 8px 8px;
  background-color: ${(props) => props.theme.nord.light0};
  gap: 35px;
  @media (max-width: 430px) {
    border-radius: 10px;
    flex-direction: column;
    max-width: fit-content;
    padding: 0%;
    padding-bottom: 20px;
    gap: 20px;
  }
`;


export const Title = styled.p`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.nord.dark0};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 20px;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  @media (max-width: 430px) {
    text-align: center;
    width: 160px;
  }
`;

export const GameInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  align-content: center;
  text-align: center;
  justify-content: space-between;
  @media (max-width: 430px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: fit-content;
  gap: 100px;
  @media (max-width: 1040px) {
    gap: 10px;
  }
  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

export const TextDate = styled.p`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.nord.dark0};
  font-family: 'proxima-nova-regular', sans-serif;
  font-size: 16px;
`;

export const CoverContainer = styled.div`
  max-width: 50px;
  max-height: 50px;
  border-radius: 100%;
  overflow: hidden;
  @media (max-width: 430px) {
    max-width: 250px;
    width: 220px;
    max-height: 250px;
    height: 349px;
    border-radius: 4% 4% 0% 0%;
  }
`;

export const Cover = styled(Image)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

interface StatusProps {
  status: string;
}

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
    switch (props.status) {
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
    content: "${props => getStatusText(props.status)}";
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

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  margin: 0;
  padding: 0;
  width: fit-content;
  gap: 20px;
  cursor: pointer;
  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

