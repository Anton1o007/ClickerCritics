import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 2rem;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-extrabold", sans-serif;
  font-size: 40px;
`;

export const Line = styled.hr`
  width: 100%;
  border-top: 2px solid #333;
  padding: 0%;
  margin: 0%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  align-items: baseline;
  align-content: center;
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 80%;
  height: 100%;
  gap: 5px;
`;

export const TextMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  align-items: center;
  margin-top: 2rem;
`;

export const TextMessage = styled.p`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 20px;
`;