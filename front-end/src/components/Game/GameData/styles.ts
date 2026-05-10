import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  width: fit-content;
  padding-top: 20px;
  gap: 26px;
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const Cover = styled(Image)`
  width: 100%;
  height: 100%;
  max-width: 310px;
  top: 0;
  left: 0;
  border-radius: 10px;
  overflow: hidden;
  
`;

export const Title = styled.h1`
  padding: 0%;
  margin: 0%;
  color: ${props => props.theme.nord.black};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 32px;
  max-width: 500px;
`;

export const TextInfoContainer = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
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
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
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
  color: ${props => props.theme.nord.black};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 22px;
  font-weight: 1.6em;
`;

export const TextDate = styled.p`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.nord.dark3};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 16px;
  font-weight: bold;
`;

export const Date = styled.span`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.nord.dark3};
  font-family: 'proxima-nova-regular', sans-serif;
  font-size: 16px;
  text-transform: capitalize;
`;

export const TextInfo = styled.p`
  width: fit-content;
  padding: 4px;
  margin: 0%;
  border-radius: 5px;
  color: ${props => props.theme.nord.dark2};
  font-family: 'proxima-nova-regular', sans-serif;
`;

export const RatingContainer = styled.div`
  display: flex;
  padding-left: 10px;
  width: 100%;
  max-width: 206px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${props => props.theme.nord.light0};
  box-shadow: 0 0 3px 0 ${props => props.theme.nord.light_grey};
`;
export const RatingText = styled.p`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.nord.dark3};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 16px;
  font-weight: bold;
`;

interface RatingProps {
  $rating: number;
}

export const Rating = styled.p<RatingProps>`
  min-width: 50px;
  height: 50px;
  padding: 5px;
  color: ${(props) => props.theme.nord.dark0};
  font-family: "proxima-nova-extrabold", sans-serif;
  font-size: 24px;
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
