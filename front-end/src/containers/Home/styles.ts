import styled from "styled-components";

export const Container = styled.div`
  width: 75%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  padding: 0%;
  align-items: center;
  align-content: center;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const Text = styled.h1`
  text-align: center;
  width: fit-content;
  color: ${props => props.theme.nord.black};
  font-family: 'proxima-nova-bold', sans-serif;
`;