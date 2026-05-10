import styled from "styled-components";
import { FaList, FaTimes } from "react-icons/fa";

export const EditButton = styled(FaList)`
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
  background-color: ${props => props.theme.nord.white};
  @media (max-width: 768px) {
    width: 90%;
  }
  
`;

export const Title = styled.h2`  
  line-height: 1.2;
  font-family: 'proxima-nova-bold', sans-serif;
  text-align: center;
  font-size: 2rem;
`;

export const CritcisContainer = styled.div`
  height: 400px;
  overflow-y: auto;
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
  width: 100%;
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  padding: 0;
  width: 90%;
  height: fit-content;
  align-items: baseline;
  gap: 20px;
  @media (max-width: 430px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const EmptyMessage = styled.p`
  margin: 80px 100px;
  font-weight: bold;
`;