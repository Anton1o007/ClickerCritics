import styled from "styled-components";

export const DeleteButton = styled.button`
  width: 140px;
  background-color: ${props => props.theme.nord.dark1};
  color: ${props => props.theme.nord.light0};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.theme.nord.red};
  }
  @media (max-width: 430px) {
    width: 60%;
  }
`;

export const ConfirmationBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fondo oscurecido para el cuadro de confirmación */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ConfirmationContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 430px) {
    width: 90%;
  }
`;

export const TextInfo = styled.p`
  font-size: 1.2rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  border-radius: 5px;
  padding: 4px;
  color: black;
`;

export const ConfirmationActions = styled.div`
  margin-top: 20px;
  button {
    width: 100px;
    margin: 10px;
    padding: 10px 20px;
    border: none;
    background-color: ${props => props.theme.nord.dark1};
    color: #fff;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
    background-color: ${props => props.theme.nord.red};
  }
  }
`;
