import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";

export const Loader = styled(BeatLoader)`
  min-width: 25px;
  min-height: 25px;
  color: ${(props) => props.theme.nord.yellow};
`;



export const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  justify-content: end;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const CriticButton = styled.p`
  width: fit-content;
  font-size: 16px;
  background: ${(props) => props.theme.nord.dark0};
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => props.theme.nord.light0};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  margin-bottom: 20px;

  &:hover{
    background-color: ${(props) => props.theme.nord.dark1};
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const Form = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 1%;
  background-color: ${(props) => props.theme.nord.white};
  border-radius: 10px;
  gap: 15px;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const Input = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  width: 90%;
  height: 200px;
  max-width: 800px;
  outline: none;
  border: 1px solid ${(props) => props.theme.nord.dark0};
  font-size: 16px;
  text-align: start;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  resize: none;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.nord.light3};

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
`;

export const Title = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.dark0};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 32px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Cover = styled(Image)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
`;

export const GameCard = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 90%;
  height: fit-content;
  align-items: center;
  align-content: center;
  gap: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  gap: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  gap:10px;
`;

export const TextDate = styled.p`
  width: 150px;
  padding: 0;
  margin: 0;
  color: ${props => props.theme.nord.dark3};
  font-family: 'proxima-nova-regular', sans-serif;
  font-size: 16px;
  font-weight: 100;
`;

export const TextInfo = styled.p`
  width: 120px;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 16px;
`;

export const Label = styled.p`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 16px;
  font-weight: 600;
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

export const SubmitButton = styled.button`
  font-size: 20px;
  background: ${(props) => props.theme.nord.dark0};
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => props.theme.nord.light0};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  margin-bottom: 20px;

  &:hover{
    transform: scale(1.05);
    transition: transform 0.2s;
    background-color: ${(props) => props.theme.nord.dark1};
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
  height: auto;
  margin: auto;
  padding: 0.5rem;
  gap: 20px;
`;

export const ErrorClose = styled(FaTimes)`

`;


