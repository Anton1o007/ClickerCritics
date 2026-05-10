import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  align-content: center;
  padding-top: 2rem;
  margin-bottom: 4rem;
  width: 20%;
  height: fit-content;
  gap: 5px;
  @media (max-width: 768px) {
    padding-top: 0;
    margin-bottom: 0;
    width: fit-content;
  }
`;

export const FilterButton = styled.p`
  width: fit-content;
  font-size: 14px;
  background: ${(props) => props.theme.nord.dark0};
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) => props.theme.nord.light0};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  margin-bottom: 0px;

  &:hover{
    background-color: ${(props) => props.theme.nord.dark1};
  }
`;

export const Title = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 24px;
`;

export const Line = styled.hr`
  width: 100%;
  border-top: 2px solid #333;
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

export const FilterTitle = styled.p`
  max-width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  font-family: "proxima-nova-condensed-bold", sans-serif;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const FilterOption = styled.div`
  width: 95%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    max-width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
    font-weight: 100;
    margin-left: 20px;
    font-family: "proxima-nova-regular", sans-serif;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 2.5px;
    border: 1px solid #ccc;
    outline: none;
    margin-right: 10px;
    cursor: pointer;
    height: 20px;
    width: 20px;
    background-color: white;

    &:hover {
      border-color: ${(props) => props.theme.nord.dark1};
      background-color: ${(props) => props.theme.nord.light0};
    }
  }

  input[type="checkbox"]:checked {
    background-color: ${(props) => props.theme.nord.dark1};
    border-color: ${(props) => props.theme.nord.dark4};
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('/images/tick.png') no-repeat center center;
    background-size: 100% 100%;

  }


  select {
    border-radius: 4px;
    border: 2px solid #ccc;
    outline: none;
    margin-right: 10px;
    cursor: pointer;
  }

  select {
    appearance: none;
    cursor: pointer;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const CrossContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const CloseButton = styled(FaTimes)`
  position: fixed;
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.nord.black};
  margin-right: 10px;
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
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 2%;
  background-color: ${(props) => props.theme.nord.white};
  border-radius: 10px;
  overflow-y: auto;
  gap: 15px;
  @media (max-width: 768px) {
    width: 90%;
    height: 95%;
  }
`;

export const FiltersContainer = styled.div`
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  padding: 0 2%;
  margin: 4%;
  background-color: ${(props) => props.theme.nord.white};
  border-radius: 10px;
  overflow-y: auto;
  gap: 15px;
  @media (max-width: 768px) {
    width: 90%;
    height: 95%;
  }
`;