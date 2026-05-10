import type { FC } from "react";
import React, { useCallback, useEffect, useState } from "react";
import {
  CardsDiv,
  Column,
  Container,
  GamesContainers,
  Line,
  PaginationButton,
  PaginationRow,
  Row,
  TextMessage,
  TextMessageContainer,
  Title,
  TitleRow,
} from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import GameCard from "@/components/Game/GameCard";
import Link from "next/link";
import { GameFilter } from "..";

export type GameScoreTuple = {
  game: GameProps;
  score: number | null;
};

export type Props = {
  gameList: GameScoreTuple[];
  sectionTitle: string;
  platforms: string[];
  genres: string[];
  defaultUrl: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
};

const GameList: FC<Props> = ({
  gameList,
  sectionTitle,
  platforms,
  genres,
  defaultUrl,
  setUrl,
  page,
  handleNextPage,
  handlePreviousPage,
}) => {
  const [columnCount, setColumnCount] = useState<number>(5);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 425) {
        setColumnCount(1);
      } else if (screenWidth < 768) {
        setColumnCount(2);
      } else if (screenWidth <= 1024) {
        setColumnCount(4);
      } else {
        setColumnCount(5);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderCardGames = () => {
    const gamesInGroupsOfFour: GameScoreTuple[][] = [];
    let group: GameScoreTuple[] = [];

    gameList.forEach((gameTuple, index) => {
      if (index > 0 && index % columnCount === 0) {
        gamesInGroupsOfFour.push(group);
        group = [];
      }
      group.push(gameTuple);
    });

    if (group.length > 0) {
      gamesInGroupsOfFour.push(group);
    }

    return gamesInGroupsOfFour.length > 0 ? (
      gamesInGroupsOfFour.map((gamesGroup, groupIndex) => (
        <GamesContainers key={`group-${groupIndex}`}>
          {gamesGroup.map(({ game, score }: GameScoreTuple, index: number) => (
            <CardsDiv key={`game-${index}`}>
              <Link href={`/game/${game.id}`}>
                <GameCard
                  gameData={{ game, score }}
                  cardWidth={163}
                  cardHeight={244}
                />
              </Link>
            </CardsDiv>
          ))}
        </GamesContainers>
      ))
    ) : (
      <TextMessageContainer>
        <TextMessage>
          No hay juegos disponibles para los parametros seleccionados
        </TextMessage>
      </TextMessageContainer>
    );
  };

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <Container>
      <Row>
        {!isMobile && (
          <GameFilter
            setUrl={setUrl}
            platforms={platforms}
            genres={genres}
            defaultUrl={defaultUrl}
          />
        )}
        <Column>
          <TitleRow>
            <Title>{sectionTitle}</Title>
            {isMobile && (
              <GameFilter
                setUrl={setUrl}
                platforms={platforms}
                genres={genres}
                defaultUrl={defaultUrl}
              />
            )}
          </TitleRow>
          <Line />
          {renderCardGames()}
          <PaginationRow>
            <PaginationButton onClick={handlePreviousPage} disabled={page === 1}>
              Página Anterior
            </PaginationButton>
            <PaginationButton onClick={handleNextPage}>
              Página Siguiente
            </PaginationButton>
          </PaginationRow>
        </Column>
      </Row>
    </Container>
  );
};

export default GameList;
