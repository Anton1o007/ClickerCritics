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
import { Game as GameProps } from "@/models/Game/types";
import DeleteGameFromWishListButton from "../DeleteGameFromWishListButton";

export type Props = {
  gameData: GameProps;
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
};

const UserWishCard: FC<Props> = ({
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

  const date = formatDate(gameData.release_date).toString();

  return (
    <Container>
      <CoverContainer>
        <Cover
          src={gameData.cover}
          width={1000}
          height={1000}
          alt=""
        />
      </CoverContainer>
      <GameInfo>
        <Row>
          <Link href={`/game/${gameData.id}`}>
            <Title>{gameData.title}</Title>
          </Link>
          <TextDate>{date}</TextDate>
        </Row>
        <StatusContainer>
          {authenticated && (
              <DeleteGameFromWishListButton
                gameData={gameData}
                fetchUserDetails={fetchUserDetails}
              />
          )}
        </StatusContainer>
      </GameInfo>
    </Container>
  );
};

export default UserWishCard;
