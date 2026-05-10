import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  overflow: hidden;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Avatar = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  margin-top:10px;
`;

export const TextInfoContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

export const UsernameText = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${props => props.theme.nord.black};
  font-family: 'proxima-nova-bold', sans-serif;
`;

export const TextInfo = styled.p`
  width: fit-content;
  padding: 4px;
  margin: 0%;
  border-radius: 5px;
  color: ${props => props.theme.nord.dark2};
  font-size: 20px;
  font-family: 'proxima-nova-regular', sans-serif;
  font-weight: bold;
`;

export const UserGenre = styled.p<{ index: number }>`
  width: fit-content;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: ${props =>
    props.index === 0
      ? props.theme.nord.yellow
      : props.index === 1
      ? props.theme.nord.light_grey
      : props.theme.nord.bronze};
  color: ${props => props.theme.nord.white};
`;

export const GenresList = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  align-content: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
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
  gap: 40px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    gap: 20px;
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  gap:10px;
`;