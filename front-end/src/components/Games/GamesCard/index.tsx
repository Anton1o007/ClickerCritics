import { FC } from "react";
import {
  Container,
  TextDate,
  Row,
  Title,
  GameInfo,
  Cover,
  CoverContainer,
  StatusContainer,
} from "./styles";
import Link from "next/link";
import { Game as GameProps} from "@/models/Game/types";
import ListCriticsButton from "../ListCriticsButton";

export type GameScoreTuple = {
  game: GameProps;
  score: number;
};

export type Props = {
  gameData: GameScoreTuple;
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
};

const GamesCard: FC<Props> = ({
  gameData,
  fetchUserDetails,
  authenticated,
}) => {
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

    date = new Date(date);
    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${month} ${day},${year}`;
  }

  const date = formatDate(gameData.game.release_date);


  return (
    <Container>
      <CoverContainer>
        {gameData.game.cover ? (
          <Cover src={gameData.game.cover} width={50} height={50} alt="" />
        ) : (
          <Cover src="/images/default_user.png" width={50} height={50} alt="" />
        )}
      </CoverContainer>
      <GameInfo>
        <Row>
          <Link href={`/game/${gameData.game.id}`}>
            <Title>{gameData.game.title}</Title>
          </Link>
          <TextDate>{date}</TextDate>
        </Row>
        <StatusContainer>
          {" "}
          {authenticated && (
            <>
              <ListCriticsButton
                gameData={gameData.game}
                fetchUserDetails={fetchUserDetails}
              />
            </>
          )}
        </StatusContainer>
      </GameInfo>
    </Container>
  );
};

export default GamesCard;
