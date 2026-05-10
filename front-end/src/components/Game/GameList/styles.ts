import styled from "styled-components";

export const Container = styled.div`
  display: fixed;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding-top: 2rem;
  margin-bottom: 1rem;
  width: 90%;
  height: 100%;
`;

export const Title = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 30px;
`;

export const Line = styled.hr`
  width: 100%;
  border-top: 2px solid #333;
  padding: 0%;
  margin: 0%;
`;

export const GamesContainers = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5%;
  padding: 0;
  justify-content: center;
  width: 100%;
  height: fit-content;
  gap: 35px;
  @media (max-width: 430px) {
    justify-content: center;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  align-items: baseline;
  align-content: center;
  justify-content: center;
  gap: 50px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 1000px;
  height: 100%;
  gap: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;

`;

export const TextMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  align-items: center;
  margin-top: 2rem;
`;

export const TextMessage = styled.p`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 20px;
`;

export const PaginationRow = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 10px;
`;

export const PaginationButton = styled.button`
  width: 140px;
  height: fit-content;
  text-align: center;
  padding: 10px 15px;
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 14px;
  border-radius: 5px;
  color: ${props => props.theme.nord.light3};
  background-color: ${props => props.theme.nord.dark0};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.nord.light3};
    background-color: ${props => props.theme.nord.dark3};

  }
`;
