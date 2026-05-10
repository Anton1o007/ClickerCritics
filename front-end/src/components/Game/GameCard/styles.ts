import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
  border-radius: 10px;
`;

export const Cover = styled(Image)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Title = styled.h1`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.light0};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 22px;
`;

export const TextInfoContainerOriginal = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
`;

export const TextInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7); /* color del fondo del banner */
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  gap: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
`;

export const Platform = styled.p`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 22px;
  font-weight: 1.6em;
`;

export const TextDate = styled.p`
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.nord.light0};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 14px;
  font-weight: bold;
`;

interface RatingProps {
  $rating: number;
}

export const Rating = styled.p<RatingProps>`
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: 40px;
  height: 40px;
  padding: 5px;
  color: ${(props) => props.theme.nord.dark0};
  font-family: "proxima-nova-extrabold", sans-serif;
  font-size: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    const { $rating } = props;
    if ($rating >= 0 && $rating < 2) {
      return "background: linear-gradient(#ff0000 0%, #ff0000 10%)";
    } else if ($rating >= 2 && $rating < 4) {
      return "background: linear-gradient(#ff4000 10%, #ff4000 20%)";
    } else if ($rating >= 4 && $rating < 6) {
      return "background: linear-gradient(#ff8000 20%, #ff8000 30%)";
    } else if ($rating >= 6 && $rating < 8) {
      return "background: linear-gradient(#ffbf00 30%, #ffbf00 40%)";
    } else if ($rating >= 8 && $rating <= 10) {
      return "background: linear-gradient(#00ff80 90%, #00ff80 100%)";
    } else {
      return "background: none";
    }
  }};
`;

export const NotRated = styled.p`
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: 40px;
  height: 40px;
  padding: 5px;
  color: ${(props) => props.theme.nord.dark0};
  background-color: ${(props) => props.theme.nord.light_grey};
  font-family: "proxima-nova-extrabold", sans-serif;
  font-size: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
