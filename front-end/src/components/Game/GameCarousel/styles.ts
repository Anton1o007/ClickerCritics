import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding-top: 20px;
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
  width: 100%;
  height: fit-content;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5%;
  justify-content: center;
  width: 100%;
  height: fit-content;
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

export const Line = styled.hr`
  border-top: 2px solid #333;
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 800px;

  .carousel .slide {
    background: none;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const MediaWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img, iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
