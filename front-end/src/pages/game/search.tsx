import React, { useState, useEffect } from "react";
import { GameList } from "@/components/Game";
import { Game as GameProps } from "@/models/Game/types";
import Error from "@/components/Error";
import { useRouter } from 'next/router';

export type GameScoreTuple = {
  game: GameProps;
  score: number | null;
};

const SearchedGames = () => {
  const defaultUrl = "https://clicker-critics-api.onrender.com/game/games_list?new=true";
  const [gamesList, setGamesList] = useState<GameScoreTuple[]>([]);
  const [url, setUrl] = useState<string>(defaultUrl);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(20);

  const router = useRouter();
  const gamesListQuery = router.query.gamesList;

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    const fetchGames = async () => {
      try {
        if (gamesListQuery) {
          try {
            const parsedGamesList = JSON.parse(gamesListQuery as string);

            const formattedGames = parsedGamesList.map((gameScoreTuple: any) => {
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

            setGamesList(formattedGames);
          } catch (parseError) {
            console.error("Error parsing gamesList:", parseError);
            setError(true);
            return;
          }
        }

        const platformsResponse = await fetch("https://clicker-critics-api.onrender.com/game/unique_platforms");
        const genresResponse = await fetch("https://clicker-critics-api.onrender.com/game/unique_genres");

        if (!platformsResponse.ok || !genresResponse.ok) {
          setError(true);
          return;
        }

        const platformsJson = await platformsResponse.json();
        setPlatforms(platformsJson);

        const genresJson = await genresResponse.json();
        setGenres(genresJson);
      } catch (error) {
        setError(true);
        console.error("Error fetching games data:", error);
      }
    };

    fetchGames();
  }, [gamesListQuery]);

  useEffect(() => {
    const newUrl = `${defaultUrl}&limit=${limit}&skip=${(page - 1) * limit}`;
    setUrl(newUrl);
  }, [page, limit]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));

  if (error) {
    return <Error message="Hubo un error al cargar los datos de los juegos." />;
  }

  return (
    <GameList
      gameList={gamesList}
      sectionTitle="JUEGOS BUSCADOS"
      setUrl={setUrl}
      platforms={platforms}
      genres={genres}
      defaultUrl={defaultUrl}
      page={page}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
    />
  );
};

export default SearchedGames;
