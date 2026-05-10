import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { CardsDiv, Container } from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import ScoredGameCard from "../ScoredGameCard";
import Link from "next/link";

export type GameScoreTuple = {
  game: GameProps;
  score: number;
};

export type Props = {
  gameList: GameScoreTuple[];
};

const ScoredGamesList: FC<Props> = ({ gameList }) => {
  const [cardsPerRow, setCardsPerRow] = useState<number>(2);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      setCardsPerRow(1);
    } else {
      setCardsPerRow(2);
    }
  };

  useEffect(() => {

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderCardGames = () => {
    const gamesInRows: GameScoreTuple[][] = [];

    for (let i = 0; i < gameList.length; i += cardsPerRow) {
      const row = gameList.slice(i, i + cardsPerRow);
      gamesInRows.push(row);
    }

    return (
      <Container>
        {gamesInRows.map((gamesRow, rowIndex) => (
          <CardsDiv key={`row-${rowIndex}`}>
            {gamesRow.map(({ game, score }: GameScoreTuple, index: number) => (
              <Link href={`/game/${game.id}`} key={`game-${index}`}>
                <ScoredGameCard gameData={{ game, score }} />
              </Link>
            ))}
          </CardsDiv>
        ))}
      </Container>
    );
  };

  return <>{renderCardGames()}</>;
};

export default ScoredGamesList;
