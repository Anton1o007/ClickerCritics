import styled from "styled-components";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export const EditButton = styled(FaPencilAlt)`
  font-size: 20px;
  color: ${props => props.theme.nord.blue3};
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

export const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 3px 0 gray;
  gap: 0.5rem;
  padding: 2%;
  margin: 5%;
  background-color: ${props => props.theme.nord.light0};
  @media (max-width: 768px) {
    width: 90%;
    height: 70%;
    padding: 5%;
  }
  @media (max-width: 430px) {
    height: 90%;
  }
`;

export const Title = styled.h2`  
  line-height: 1.2;
  font-family: 'proxima-nova-bold', sans-serif;
  text-align: center;
  font-size: 2rem;
`;

export const Container = styled.div`
  margin: 10px;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

export const Form = styled.form`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const Row = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  @media (max-width: 430px) {
    flex-direction: column;
  }
`;


export const ToggleRow = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  gap: 20px;
`;

export const TextLabel = styled.h2`
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 20px;
  font-weight: 600;
`;

export const Input = styled.input`
  box-shadow: 0 0 2px 0 ${(props) => props.theme.nord.light_grey};
  margin-top: 10px;
  padding: 15px;
  border-radius: 5px;
  background: white;
  color: gray;
  width: 200px;
  height: 40px;
  outline: none;
  border: none;
  font-size: 1em;
  font-family: "proxima-nova-regular", sans-serif;
`;

export const Description = styled.textarea`
  border: none;
  box-shadow: 0 0 2px 0 ${(props) => props.theme.nord.light_grey};
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  width: 500px;
  height: 150px;
  outline: none;
  font-size: 1em;
  font-family: "proxima-nova-regular", sans-serif;
  text-align: left;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  resize: none;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 5px; 
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.nord.dark0}; 
    border-radius: 5px; 
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  border-radius: 8px;
  background-color: red;
  color: white;
  border-color: black;
  width: fit-content;
  max-width: 200px;
  text-align: justify;
  height: auto;
  margin: auto;
  padding: 0.5rem;
  gap: 20px;
`;

export const Button = styled.button`

  padding: 15px 35px;
  margin-top: 10%;
  border-radius: 9px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${props => props.theme.nord.dark1};
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s;
    box-shadow: 0 0 3px black;
    background-color: ${props => props.theme.nord.green};
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CrossContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const CloseButton = styled(FaTimes)`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.nord.black};
  margin-right: 10px;
`;


export const ToggleButton = styled.button<{ active: boolean }>`
  position: relative;
  display: inline-block;
  width: 40px; /* Ancho más pequeño */
  height: 20px; /* Altura más pequeña */
  background-color: ${(props) => (props.active ? "#4CAF50" : "#ccc")};
  border: none;
  border-radius: 10px; /* Radio de borde más pequeño */
  transition: background-color 0.3s;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    width: 16px; /* Diámetro más pequeño */
    height: 16px; /* Diámetro más pequeño */
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: ${(props) => (props.active ? "calc(100% - 18px)" : "2px")}; /* Posición de la pelota más pequeña */
    transition: left 0.3s;
  }
`;


export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
`;