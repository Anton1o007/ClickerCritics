import React, { FC } from "react";
import { Container, Text } from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import GameListPreview from "@/components/Game/GameListPreview";
import AboutScore from "@/components/AboutScore";

export type GameScoreTuple = {
  game: GameProps;
  score: number | null;
};

export type Props = {
  newGameListPreview: GameScoreTuple[];
  upcomingGameListPreview: GameScoreTuple[];
  bestGameListPreview: GameScoreTuple[];

}
const Home: FC<Props> = ({ newGameListPreview, upcomingGameListPreview, bestGameListPreview }) => {
  return (
    <Container>
      <Text>Bienvenido a ClickerCritics</Text>
      <GameListPreview gameList={newGameListPreview} sectionTitle="Nuevos Juegos" redirecLink="/game/all/new" />
      <GameListPreview gameList={upcomingGameListPreview}sectionTitle="Próximos Lanzamientos" redirecLink="/game/all/upcoming" />
      <GameListPreview gameList={bestGameListPreview}sectionTitle="Mejores Juegos" redirecLink="/game/all/best" />
      <AboutScore />
    </Container>
  );
};

export default Home;
