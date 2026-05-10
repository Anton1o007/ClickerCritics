import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  padding: 5%;
  max-width: 1110px;
  width: 100%;
  height: fit-content;
  background-color: ${(props) => props.theme.nord.dark0};
  gap: 50px;
  margin-top: 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const InfoContainer = styled.p`
  width: fit-content;
  height: fit-content;
  text-align: justify;
  color: ${(props) => props.theme.nord.light0};
  font-size: 20px;
`;

export const Title = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.light3};
  font-family: "proxima-nova-bold", sans-serif;
  font-size: 26px;
  margin-bottom: 10px;
`;

export const Line = styled.hr`
  width: 100%;
  border-top: 2px solid #333;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  align-content: center;
  gap: 5px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  gap:10px;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Label = styled(Link)`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.light_grey};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 16px;

  &:hover {
    text-decoration-line: underline;
  }
`;

export const Text = styled.p`
  width: 400px;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.light3};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 32px;
  font-weight: bolder;
  @media (max-width: 768px) {
    width: fit-content;
    font-size: 28px;
  }
`;