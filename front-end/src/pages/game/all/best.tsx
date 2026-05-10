import React, { useEffect, useState, useCallback } from 'react';
import { GameList } from '@/components/Game';
import { Game as GameProps } from '@/models/Game/types';
import Error from '@/components/Error';

export type GameScoreTuple = {
  game: GameProps;
  score: number | null;
};

const BestGames = () => {
  const defaultUrl = "https://clicker-critics-api.onrender.com/game/games_list?best=true";
  const [gamesList, setGamesList] = useState<GameScoreTuple[]>([]);
  const [url, setUrl] = useState<string>(defaultUrl);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(20);

  const handleResponse = useCallback(async (response: Response) => {
    if (response.ok) {
      return await response.json();
    } else {
      setError(true);
      console.error("Error:", response.statusText);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('access_token');
      const currentUserId = localStorage.getItem("user_id");
      try {
        const [gamesData, platformsData, genresData] = await Promise.all([
          fetch(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "current-user-id": currentUserId || "",
            },
          }).then(handleResponse),
          fetch("https://clicker-critics-api.onrender.com/game/unique_platforms").then(handleResponse),
          fetch("https://clicker-critics-api.onrender.com/game/unique_genres").then(handleResponse),
        ]);

        if (gamesData) {
          setGamesList(gamesData.map((gameScoreTuple: any) => {
            const { game, score } = gameScoreTuple;
            const releaseDate = new Date(game.release_date);
            return {
              game: {
                ...game,
                release_date: releaseDate,
              },
              score: score,
            };
          }));
        }

        if (platformsData) {
          setPlatforms(platformsData);
        }

        if (genresData) {
          setGenres(genresData);
        }
      } catch (error) {
        setError(true);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url, handleResponse]);

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
      sectionTitle='MEJORES JUEGOS'
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

export default BestGames;
