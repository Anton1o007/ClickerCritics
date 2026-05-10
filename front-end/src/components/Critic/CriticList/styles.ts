import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding-top: 1rem;
  width: 80%;
  height: fit-content;
  gap: 20px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  width: fit-content;
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.black};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 32px;
  margin-bottom: 10px;
`;

export const Line = styled.hr`
  width: 100%;
  border-top: 2px solid #333;
`;

export const GamesContainers = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5%;
  padding: 0;
  width: fit-content;
  height: fit-content;
  gap: 25px;
`;

export const RatingContainer = styled.div`
  display: flex;
  padding-left: 10px;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  gap: 40px;
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
  border-radius: 5%;
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