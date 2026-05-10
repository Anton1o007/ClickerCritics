import { FC } from "react";
import {
  Container,
  Cover,
  Date,
  Platform,
  Rating,
  RatingContainer,
  RatingText,
  Row,
  TextDate,
  TextInfoContainer,
  Title,
} from "./styles";
import { Game } from "@/models/Game/types";
import AddGameButton from "@/components/UserGames/AddGameButton";
import { AddGameToWishListButton } from "@/components/UserGames";

type RatingProps = {
  users: number | null;
  professionals: number | null;
  currentUser: number | null;
};

export type Props = {
  gameData: Game;
  score: number | null;
  ratings: RatingProps;
  authenticated: boolean;
  isAdded: boolean;
  isAddedToWishList: boolean;
  isBeforeReleaseDate: boolean;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddedToWishList: React.Dispatch<React.SetStateAction<boolean>>; 
};

const GameData: FC<Props> = ({ gameData, score, ratings, authenticated, isAdded, isAddedToWishList, isBeforeReleaseDate, setIsAdded, setIsAddedToWishList }) => {
  function formatDate(date: Date): string {
    const months: string[] = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${month} ${day},${year}`;
  }

  const date = formatDate(gameData.release_date).toString();

  return (
    <Container>
      <Cover src={gameData.cover} width={1000} height={1000} alt="" />
      <TextInfoContainer>
        <Title>{gameData.title}</Title>
        <Platform>{gameData.platforms[0]}</Platform>
        <Row>
          <TextDate>Fecha de Salida:</TextDate>
          <Date>{date}</Date>
        </Row>
        {score !== null ? (
          <RatingContainer>
            <RatingText>Puntuación Global</RatingText>
            <Rating $rating={score}>{score.toFixed(1)}</Rating>
          </RatingContainer>
        ) : (
          <TextDate>No hay puntuaciones todavía</TextDate>
        )}
        {authenticated ? (
          ratings.currentUser !== null ? (
            <RatingContainer>
              <RatingText>Puntuación Usuario</RatingText>
              <Rating $rating={ratings.currentUser}>
                {ratings.currentUser.toFixed(1)}
              </Rating>
            </RatingContainer>
          ) : (
            <TextDate>Aún no has puntuado este juego.</TextDate>
          )
        ) : (
          <TextDate>Logueate para puntuar este juego.</TextDate>
        )}
        {authenticated && !isAdded && isBeforeReleaseDate && (<AddGameButton gameData={gameData} setIsAdded={setIsAdded} />)}
        {authenticated && !isAddedToWishList && !isBeforeReleaseDate && (<AddGameToWishListButton gameData={gameData} setIsAddedToWishList={setIsAddedToWishList} />)}
      </TextInfoContainer>
    </Container>
  );
};

export default GameData;
