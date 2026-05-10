import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 10px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.nord.light0};
  gap: 35px;
  @media (max-width: 425px) {
    width: 100%;
    min-width: 280px;
  }
`;

export const Text = styled.p<{ isExpanded: boolean }>`
  padding: 0%;
  margin: 0%;
  color: ${props => props.theme.nord.dark0};
  font-family: 'proxima-nova-regular', sans-serif;
  text-align: justify;
  font-size: 18px;
  overflow: hidden;
  position: relative;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  min-height: 70px;
  -webkit-box-orient: vertical;

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 20px;

  }

  ${({ isExpanded }) => isExpanded && `
    -webkit-line-clamp: unset;
    &:before {
      display: none;
    }
  `}
`;


export const Author = styled.p`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.nord.dark0};
  font-family: 'proxima-nova-condensed-bold', sans-serif;
  font-size: 20px;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 425px) {
    max-width: 120px;
  }
`;

export const Professional = styled.p`
  padding: 0%;
  margin: 0%;
  color: ${props => props.theme.nord.purple};
  font-family: 'proxima-nova-regular', sans-serif;
  font-size: 16px;
`;

export const TextInfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const CriticInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 425px) {
    flex-direction: column;
    gap: 30px;
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

export const TextDate = styled.p`
  padding: 0;
  margin: 0;
  color: ${props => props.theme.nord.dark0};
  font-family: 'proxima-nova-regular', sans-serif;
  font-size: 16px;
`;

interface RatingProps {
  $rating: number;
}

export const Rating = styled.p<RatingProps>`
  min-width: 35px;
  height: 35px;
  padding: 5px;
  color: ${(props) => props.theme.nord.dark0};
  font-family: "proxima-nova-extrabold", sans-serif;
  font-size: 24px;
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
  
  @media (max-width: 425px) {
    min-width: 50px;
    height: 50px;
    font-size: 32px;
    border-radius: 100%;
  }
`;


export const Cover = styled(Image)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
`;
