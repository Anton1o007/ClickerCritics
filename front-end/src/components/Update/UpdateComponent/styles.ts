import styled from 'styled-components';

export const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  padding: 2.5%;
  text-align: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 0 3px 0 gray;
  gap: 0.5rem;
  padding: 2.5%;
  margin: 5%;
`;

export const Title = styled.h2`
  
  line-height: 1.2;
  font-family: 'proxima-nova-bold', sans-serif;
  text-align: center;
  font-size: 2rem;
  padding: 5%;
`;

export const Container = styled.div`
  margin: 10px;
`;

export const Form = styled.form`
  width: fit-content;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
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
  height: 200px;
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
  justify-content: center;

`;
