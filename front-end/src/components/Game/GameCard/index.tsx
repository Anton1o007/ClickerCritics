import { useState, FC } from "react";
import {
  Container,
  Cover,
  TextInfoContainer,
  Title,
  TextDate,
  Rating,
  NotRated,
} from "./styles";
import { Game } from "@/models/Game/types";

export type Props = {
  gameData: {
    game: Game;
    score: number | null;
  };
  cardWidth: number;
  cardHeight: number;
};

const GameCard: FC<Props> = ({ gameData, cardWidth, cardHeight }) => {
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

  const [showInfo, setShowInfo] = useState(false);
  const date = formatDate(gameData.game.release_date).toString();
  const score = gameData.score;

  return (
    <Container>
      <Cover
        src={gameData.game.cover}
        width={1000}
        height={1000}
        alt=""
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        style={{ maxWidth: `${cardWidth}px`, minHeight: `${cardHeight}px` }}
      />
      {score !== null ? (
        <Rating $rating={score}>{score.toFixed(1)}</Rating>
      ) : (
        <NotRated>N/A</NotRated>
      )}
      {showInfo && (
        <TextInfoContainer>
          <Title>{gameData.game.title}</Title>
          <TextDate>{date}</TextDate>
        </TextInfoContainer>
      )}
    </Container>
  );
};

export default GameCard;
