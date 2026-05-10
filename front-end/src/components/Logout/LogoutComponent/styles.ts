import styled from "styled-components";

// Estilo para el botón de cierre de sesión
export const LogOutButton = styled.button`
  width: 140px;
  background-color: ${props => props.theme.nord.dark1};
  color: ${props => props.theme.nord.light0};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.theme.nord.blue4};
  }
  @media (max-width: 430px) {
    width: 60%;
  }
`;

// Estilo para el cuadro de diálogo de confirmación
export const ConfirmationBackground = styled.div`
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

// Estilo para el contenido del cuadro de diálogo
export const ConfirmationContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: black;
  @media (max-width: 430px) {
    width: 90%;
  }
`;

// Estilo para las acciones del cuadro de diálogo
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
  }

  button:hover {
    background-color: ${props => props.theme.nord.blue4};
  }
`;

// Estilo para el texto informativo
export const TextInfo = styled.p`
  font-size: 1.2rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  border-radius: 5px;
  padding: 4px;
  color: black;
`;
