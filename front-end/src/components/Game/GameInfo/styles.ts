import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding-top: 20px;
  padding-bottom: 5%;
  gap: 76px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5%;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: start;
  align-content: start;
  gap: 50px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    align-content: center;
    gap: 0;
  }
`;

export const Box = styled.div`
  width: 400px;
  height: fit-content;
  margin-top: 20px;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 2px 1px 2px 0 ${(props) => props.theme.nord.dark0}; /* Cambié los valores para la sombra */
  gap: 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TextInfo = styled.p`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 16px;
`;

export const PlatformContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: fit-content;
`;

export const Platform = styled.p`
  width: fit-content;
  margin: 5px;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 14px;
`;

export const GenreContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: fit-content;
`;

export const Genre = styled.p`
  width: fit-content;
  margin: 5px;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 14px;
`;

export const Label = styled.p`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-bold", sans-serif;
  font-size: 16px;
`;

export const Title = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 32px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 26px;
  }
`;

export const AgeRating = styled.h1`
  padding: 0%;
  margin-top: 40px;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  margin-top: 20px;
  max-width: 800px;
  text-align: justify;
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 16px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: baseline;
  gap: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  @media (max-width: 768px) {
    max-width: 90%;
    align-items: center;
    align-content: center;
  }
`;

export const Line = styled.hr`
  border-top: 2px solid #333;
`;
