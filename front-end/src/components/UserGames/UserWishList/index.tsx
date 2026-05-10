import type { FC } from "react";
import React from "react";
import { Container } from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import UserWishCard from "../UserWishCard";

export type Props = {
  gameList: GameProps[];
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
};

const UserWishList: FC<Props> = ({ gameList, fetchUserDetails, authenticated }) => {
  return (
    <Container>
      {gameList.map((gameData, index) => (
        <UserWishCard key={index} gameData={gameData} fetchUserDetails={fetchUserDetails} authenticated={authenticated} />
      ))}
    </Container>
  );
};

export default UserWishList;
