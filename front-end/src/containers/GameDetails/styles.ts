import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  margin-bottom: 15%;
  height: fit-content;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const ButtonsContainer = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2.5%;
`;

export const ChageRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  justify-content: center;
  margin-top: 50px;
  gap: 100px;
`;

export const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0;
  padding: 0;
  height: fit-content;
  justify-content: space-between;
  margin-top: 50px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
`;

export const ChangeButton = styled.p`
  font-family: "proxima-nova-condensed-bold";
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;

  &.subrayado {
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 6px;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ListButton = styled.p`
  width: 150px;

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
    background-color: ${(props) => props.theme.nord.dark0};
    color: ${(props) => props.theme.nord.light0};
  }
`;

export const Text = styled.p`
  margin-top: 2rem;
  color: ${props => props.theme.nord.dark3};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 16px;
  font-weight: bold;
`;