import React, { useEffect, useState } from "react";
import { GameList } from "@/components/Game";
import { Game as GameProps } from "@/models/Game/types";
import Error from "@/components/Error";

export type GameScoreTuple = {
  game: GameProps;
  score: number | null;
};

const NewGames = () => {
  const defaultUrl = "https://clicker-critics-api.onrender.com/game/games_list?new=true";
  const [gamesList, setGamesList] = useState<GameScoreTuple[]>([]);
  const [url, setUrl] = useState<string>(defaultUrl);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(20);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const currentUserId = localStorage.getItem("user_id");

    const fetchGames = async () => {
      try {
        const gamesResponse = fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "current-user-id": currentUserId || "",
          },
        });

        const platformsResponse = fetch("https://clicker-critics-api.onrender.com/game/unique_platforms");
        const genresResponse = fetch("https://clicker-critics-api.onrender.com/game/unique_genres");

        const [games, platformsData, genresData] = await Promise.all([gamesResponse, platformsResponse, genresResponse]);

        if (!games.ok || !platformsData.ok || !genresData.ok) {
          setError(true);
          return;
        }

        const gamesJson = await games.json();
        const normalizedGamesList: GameScoreTuple[] = gamesJson.map(
          (gameScoreTuple: any) => {
            const { game, score } = gameScoreTuple;

            const releaseDate = new Date(game.release_date);
            return {
              game: {
                ...game,
                release_date: releaseDate,
              },
              score: score,
            };
          }
        );
        setGamesList(normalizedGamesList);

        const platformsJson = await platformsData.json();
        setPlatforms(platformsJson);

        const genresJson = await genresData.json();
        setGenres(genresJson);
      } catch (error) {
        setError(true);
        console.error("Error fetching games data:", error);
      }
    };

    fetchGames();
  }, [url]);

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
      sectionTitle="NUEVOS JUEGOS"
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

export default NewGames;
