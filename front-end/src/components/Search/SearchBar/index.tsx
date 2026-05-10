import type { FC } from "react";
import React, { useState, useCallback } from "react";
import { Row, SearchButton, SearchInput } from "./styles";
import { useRouter } from 'next/router';

export type Props = {
  containerWidth: string;
  containerPadding: string;
  searchButtonSize: string;
  onSearchEnter ?: () => void;
};

const SearchBar: FC<Props> = ({containerWidth, containerPadding,searchButtonSize,onSearchEnter}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = useCallback(async () => {
    try {
      const response = await fetch(
        `https://clicker-critics-api.onrender.com/game/search?title=${searchTerm}&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        const gamesData = await response.json();
        const formattedGames = gamesData.map((gameScoreTuple: any) => {
          const { game, score } = gameScoreTuple;
          const releaseDate = new Date(game.release_date);
          return {
            game: {
              ...game,
              release_date: releaseDate,
            },
            score: score,
          };
        });

        // Convertir el objeto a cadena JSON antes de enviarlo por el router
        const formattedGamesJson = JSON.stringify(formattedGames);

        router.push({
          pathname: '/game/search',
          query: { gamesList: formattedGamesJson },
        });
        setSearchTerm("");
        setError(false);
      } else {
        setError(true);
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      setError(true);
      console.error("Error fetching data:", error);
    }
  }, [searchTerm, router]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      if(onSearchEnter) {
        onSearchEnter();
      }
    }
  };

  const handleButtonClick = () => {
    handleSearch();
    if(onSearchEnter) {
      onSearchEnter();
    }
  };

  return (
    <Row $containerPadding= {containerPadding} >
      <SearchInput
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        $containerWidth={containerWidth}
      />
      <SearchButton onClick={handleButtonClick} $searchButtonSize={searchButtonSize}>Buscar</SearchButton>
    </Row>
  );
};

export default SearchBar;
