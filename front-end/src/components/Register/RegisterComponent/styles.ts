import styled from 'styled-components';

const baseTextStyles = `
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 600px;
  height: fit-content;
  padding: 2.5%;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 3px 0 gray;
  gap: 0.5rem;
`;

export const Title = styled.h2`
  ${baseTextStyles}
  line-height: 1.2;
  font-family: 'proxima-nova-bold', sans-serif;
  text-align: center;
  font-size: 2rem;
  padding: 5%;
`;

export const Container = styled.div`
  margin: 10px;
  padding-bottom: 2.5%;
`;

export const Form = styled.form`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  @media (max-width: 768px) {
    padding: 5%;
  }
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

export const Label = styled.label`
  ${baseTextStyles}
  font-size: 1.2rem;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const TextLabel = styled.h2`
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  box-shadow: 0 0 2px 0 gray; 
  padding: 10px 15px;
  border-radius: 9px;
  background: white;
  color: gray;
  max-width: 500px;
  outline: none;
  border: none;
  font-size: 16px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  border-radius: 8px;
  background-color: red;
  color: white;
  border-color: black;
  width: 60%;
  height: auto;
  margin: auto;
  padding: 0.5rem;
`;

export const Button = styled.button`
  height: 60px;
  width: 200px;
  border-radius: 9px;
  padding: 0 10px;
  font-size: 1.4rem;
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

`;
