import styled from "styled-components";

export const Container = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  margin-bottom: 1rem;
  height: fit-content;
  @media (max-width: 1040px) {
    width: 90%;
  }
`;

export const ButtonsContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media (max-width: 430px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

`;

export const Description = styled.p`
  width: 100%;
  max-width: 700px;
  margin-top: 20px;
  max-width: 800px;
  text-align: justify;
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 16px;

`;

export const ChageRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  margin-top: 50px;
  gap: 100px;
  @media (max-width: 1040px) {
    gap: 0;
    flex-wrap: wrap;
    margin-top: 25px;
    justify-content: center;
  }
`;

export const ListButton = styled.p`
  width: 170px;

  color: ${(props) => props.theme.nord.dark0};
  text-align: center;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: "proxima-nova-regular";
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.3s ease;

  &.seleccionado {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 6px;
  }
`;

export const TextInfo = styled.p`
  width: 100%;
  
  color: ${(props) => props.theme.nord.dark0};
  border-radius: 5px;
  font-family: "proxima-nova-extrabold";
  font-size: 18px;
`;

export const MessageText = styled.p`
  margin-top: 2rem;
  color: ${props => props.theme.nord.dark3};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 16px;
  font-weight: bold;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 0;
  width: 100%;
  max-width: 900px;
  height: fit-content;
  gap:1rem;
  @media (max-width: 430px) {
    text-align: center;
  }
`;