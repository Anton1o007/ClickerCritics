import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5%;
  padding: 5% 2.5%;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 3px 0 gray;
  @media (max-width: 430px) {
    width: 90%;
  }
`;

export const Title = styled.h2`
  color: black;
  line-height: 1.2;
  font-family: 'proxima-nova-bold', sans-serif;
  text-align: center;
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Container = styled.div`
  margin: 10px;
  padding: 5% 0%;
`;

export const LoginForm = styled.form`
  width: 100%;
  height: 100%;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
`;

export const TextLabel = styled.h2`
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  box-shadow: 0 0 2px 0 gray; 
  padding: 10px 15px;
  margin: auto;
  display: flex;
  border-radius: 9px;
  background: white;
  color: gray;
  width: 80%;
  max-width: 400px;
  outline: none;
  border: none;
  font-size: 1em;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 8px;
  background-color: red;
  color: white;
  border-color: black;
  width: 60%;
  height: auto;
  margin: auto;
  padding: 0.5rem;
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
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
  background: ${props => props.theme.nord.dark1};
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 90%;
  }
  &:hover {
    transition: transform 0.2s;
    box-shadow: 0 0 3px black;
    background-color: ${props => props.theme.nord.blue4};
  }
`;

export const RegisterText = styled.p`

    margin-top: 15%;
`;