import type { FC } from "react";
import React, { useState, useEffect } from "react";
import { ScoredGameList, UserData } from "@/components/UserDetails";
import {
  ButtonsContainer,
  ChageRow,
  Column,
  Container,
  Description,
  ListButton,
  MessageText,
  TextInfo,
} from "./styles";
import { Logout } from "@/components/Logout";
import { UpdateButton } from "@/components/Update";
import { DeleteUser } from "@/components/UserDelete";
import { User as UserProps } from "@/models/User/types";
import { Game as GameProps } from "@/models/Game/types";
import UserGamesList from "@/components/UserGames/UserGamesList";
import { WeightSlider } from "@/components/Game";
import UserWishList from "@/components/UserGames/UserWishList";
import { UsersList } from "@/components/Users";
import { GamesList } from "@/components/Games";

export type GameScoreTuple = {
  game: GameProps;
  score: number;
};

export type GameStatusTuple = {
  game: GameProps;
  status: string;
};

export type Props = {
  userData: UserProps;
  userGenres: string[];
  gameList: GameScoreTuple[];
  userGameList: GameStatusTuple[];
  userWishList: GameProps[];
  usersList?: UserProps[];
  gamesList?: GameScoreTuple[];
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
  canEdit: boolean;
  isProfessional: boolean;
};

const User: FC<Props> = ({
  userData,
  userGenres,
  gameList,
  userGameList,
  userWishList,
  usersList = [],
  gamesList = [],
  fetchUserDetails,
  authenticated,
  canEdit,
  isProfessional,
}) => {
  const [selectedButton, setSelectedButton] = useState(
    userData.user_type === "ADMIN" ? "Users" : "ScoredGames"
  );

  const handleScoredGamesClick = () => {
    setSelectedButton("ScoredGames");
  };
  const handlePlayedGamesClick = () => {
    setSelectedButton("PlayedGames");
  };

  const handleWishListClick = () => {
    setSelectedButton("WishList");
  };

  const handleConfigurationClick = () => {
    setSelectedButton("Configuration");
  };

  const handleUsersClick = () => {
    setSelectedButton("Users");
  };

  const handleGamesClick = () => {
    setSelectedButton("Games");
  };

  useEffect(() => {
    setSelectedButton(userData.user_type === "ADMIN" ? "Users" : "ScoredGames");
  }, [userData.user_type]);

  return (
    <Container>
      <UserData user={userData} userGenres={userGenres} isProfessional={isProfessional} />
      {isProfessional && <Description>{userData.description}</Description>}
      <ChageRow>
        {userData.user_type !== "ADMIN" && (
          <>
            <ListButton
              className={selectedButton === "ScoredGames" ? "seleccionado" : ""}
              onClick={handleScoredGamesClick}
            >
              Juegos Criticados
            </ListButton>
            <ListButton
              className={selectedButton === "PlayedGames" ? "seleccionado" : ""}
              onClick={handlePlayedGamesClick}
            >
              Mis Juegos
            </ListButton>
            <ListButton
              className={selectedButton === "WishList" ? "seleccionado" : ""}
              onClick={handleWishListClick}
            >
              Lista de Deseados
            </ListButton>
          </>
        )}
        {userData.user_type === "ADMIN" && (
          <>
            <ListButton
              className={selectedButton === "Users" ? "seleccionado" : ""}
              onClick={handleUsersClick}
            >
              Usuarios
            </ListButton>
            <ListButton
              className={selectedButton === "Games" ? "seleccionado" : ""}
              onClick={handleGamesClick}
            >
              Juegos
            </ListButton>
          </>
        )}

        {canEdit && (
          <ListButton
            className={selectedButton === "Configuration" ? "seleccionado" : ""}
            onClick={handleConfigurationClick}
          >
            Configuración
          </ListButton>
        )}
      </ChageRow>
      {selectedButton === "ScoredGames" && (
        <>
          {gameList.length > 0 ? (
            <ScoredGameList gameList={gameList} />
          ) : (
            <MessageText>No has criticado ningún juego aún.</MessageText>
          )}
        </>
      )}
      {selectedButton === "PlayedGames" && (
        <>
          {userGameList.length > 0 ? (
            <UserGamesList
              gameList={userGameList}
              fetchUserDetails={fetchUserDetails}
              authenticated={authenticated}
            />
          ) : (
            <MessageText>No has jugado ningún juego aún.</MessageText>
          )}
        </>
      )}
      {selectedButton === "WishList" && (
        <>
          {userWishList.length > 0 ? (
            <UserWishList
              gameList={userWishList}
              fetchUserDetails={fetchUserDetails}
              authenticated={authenticated}
            />
          ) : (
            <MessageText>No hay juegos en tu lista de deseos.</MessageText>
          )}
        </>
      )}
      {selectedButton === "Users" && (
        <>
          {usersList.length > 0 ? (
            <UsersList
              userList={usersList}
              fetchUserDetails={fetchUserDetails}
              authenticated={authenticated}
            />
          ) : (
            <MessageText>No hay usuarios en la plataforma.</MessageText>
          )}
        </>
      )}
      {selectedButton === "Games" && (
        <>
          {gamesList.length > 0 ? (
            <GamesList
              gameList={gamesList}
              fetchUserDetails={fetchUserDetails}
              authenticated={authenticated}
            />
          ) : (
            <MessageText>No hay juegos en tu plataforma.</MessageText>
          )}
        </>
      )}
      {selectedButton === "Configuration" && canEdit && (
        <>
          <Column>
            <TextInfo> Acciones sobre perfil de usuario:</TextInfo>
            <ButtonsContainer>
              <Logout />
              <UpdateButton />
              <DeleteUser />
            </ButtonsContainer>
          </Column>
          <Column>
            <TextInfo>
              {" "}
              Modificar peso de las puntuaciones de los juegos:
            </TextInfo>
            <ButtonsContainer>
              <WeightSlider />
            </ButtonsContainer>
          </Column>
        </>
      )}
    </Container>
  );
};

export default User;
