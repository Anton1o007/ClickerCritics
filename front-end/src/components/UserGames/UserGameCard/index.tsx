import { FC } from "react";
import {
  Container,
  TextDate,
  Row,
  Title,
  GameInfo,
  Cover,
  CoverContainer,
  StatusButton,
  StatusContainer,
  ButtonsContainer,
} from "./styles";
import Link from "next/link";
import { Game as GameProps } from "@/models/Game/types";
import EditGameButton from "../EditGameButton";
import DeleteGameButton from "../DeleteGameButton";

export type GameStatusTuple = {
  game: GameProps;
  status: string;
};

export type Props = {
  gameData: GameStatusTuple;
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
};

const UserGameCard: FC<Props> = ({
  gameData,
  fetchUserDetails,
  authenticated,
}) => {
  function formatDate(dateToChange: Date): string {
    const date = new Date(dateToChange);

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

  const date = formatDate(gameData.game.release_date).toString();

  return (
    <Container>
      <CoverContainer>
        <Cover
          src={gameData.game.cover}
          width={1000}
          height={1000}
          alt=""
        />
      </CoverContainer>
      <GameInfo>
        <Row>
          <Link href={`/game/${gameData.game.id}`}>
            <Title>{gameData.game.title}</Title>
          </Link>
          <TextDate>{date}</TextDate>
        </Row>
        <StatusContainer>
          <StatusButton status={gameData.status} />
          {authenticated && (
            <ButtonsContainer>
              <EditGameButton
                gameData={gameData.game}
                fetchUserDetails={fetchUserDetails}
              />
              <DeleteGameButton
                gameData={gameData.game}
                fetchUserDetails={fetchUserDetails}
              />
            </ButtonsContainer>
          )}
        </StatusContainer>
      </GameInfo>
    </Container>
  );
};

export default UserGameCard;
