import type { FC } from "react";
import React, { useRef } from "react";
import {
  ArrowsRow,
  Column,
  Container,
  GamesContainers,
  Label,
  Line,
  Row,
  RowsContainer,
  ScrollContainer,
  StyledArrowLeft,
  StyledArrowRight,
  Title,
} from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import GameCard from "@/components/Game/GameCard";
import Link from "next/link";

export type GameScoreTuple = {
  game: GameProps;
  score: number | null;
};

export type Props = {
  gameList: GameScoreTuple[];
  sectionTitle: string;
  redirecLink: string;
};

const GameListPreview: FC<Props> = ({ gameList, sectionTitle, redirecLink }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateGamesContainerWidth = (): string => {
    const totalGames = gameList.length;
    const individualGameWidth = 163;
    const gapBetweenGames = 25;
    const totalWidth = totalGames * (individualGameWidth + gapBetweenGames);
    return `${totalWidth}px`;
  };

  const scroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  const renderCardGames = () => {
    return gameList.map((gameData: GameScoreTuple, index: number) => (
      <div key={`game-${index}`}>
        <Link href={`/game/${gameData.game.id}`}>
          <GameCard gameData={gameData} cardWidth={163} cardHeight={244}/>
        </Link>
      </div>
    ));
  };

  return (
    <Container>
      <RowsContainer>
        <Column>
          <Row>
            <Title>{sectionTitle}</Title>
            <Label href={redirecLink}>VER MÁS</Label>
          </Row>
          <Line />
        </Column>
      </RowsContainer>
      <ArrowsRow>
        <StyledArrowLeft onClick={() => scroll(-200)} />
        <ScrollContainer ref={containerRef}>
          <GamesContainers style={{ width: calculateGamesContainerWidth() }}>{renderCardGames()}</GamesContainers>
        </ScrollContainer>
        <StyledArrowRight onClick={() => scroll(200)} />
      </ArrowsRow>
    </Container>
  );
};

export default GameListPreview;
