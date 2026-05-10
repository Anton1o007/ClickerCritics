import type { FC } from "react";
import React from "react";
import { Container } from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import UserGameCard from "../UserGameCard";

export type GameStatusTuple = {
  game: GameProps;
  status: string;
};

export type Props = {
  gameList: GameStatusTuple[];
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
};

const UserGamesList: FC<Props> = ({ gameList, fetchUserDetails, authenticated }) => {
  return (
    <Container>
      {gameList.map((gameData, index) => (
        <UserGameCard key={index} gameData={gameData} fetchUserDetails={fetchUserDetails} authenticated={authenticated} />
      ))}
    </Container>
  );
};

export default UserGamesList;
