import Error from "@/components/Error";
import { Home as HomeContainer } from "@/containers";
import { Game as GameProps} from "@/models/Game/types";
import { useEffect, useState } from "react";

export type GameScoreTuple = {
  game: GameProps;
  score: number | null;
};

const Home = () => {
  const [gamesList, setGamesList] = useState<GameScoreTuple[]>([]);
  const [upcomingGamesList, setUpcomingGamesList] = useState<GameScoreTuple[]>([]);
  const [bestGameListPreview, setBestGameListPreview] = useState<GameScoreTuple[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const currentUserId = localStorage.getItem("user_id");

    const fetchGames = async (url: string, setState: React.Dispatch<React.SetStateAction<GameScoreTuple[]>>) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "current-user-id": currentUserId || "",
          },
        });

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        const normalizedGamesList: GameScoreTuple[] = data.map((gameScoreTuple: any) => {
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
        setState(normalizedGamesList);
      } catch (error) {
        setError(true);
        console.error('Error fetching games data:', error);
      }
    };

    Promise.all([
      fetchGames("https://clicker-critics-api.onrender.com/game/games_list?new=true&limit=10", setGamesList),
      fetchGames("https://clicker-critics-api.onrender.com/game/games_list?upcoming=true&limit=10", setUpcomingGamesList),
      fetchGames("https://clicker-critics-api.onrender.com/game/games_list?best=true&limit=10", setBestGameListPreview),
    ]).catch(error => {
      setError(true);
      console.error('Error fetching games data:', error);
    });
  }, []);

  if (error) {
    return  <Error message="Hubo un error al cargar los datos de los juegos." />;
  }

  return (
    <HomeContainer newGameListPreview={gamesList} upcomingGameListPreview={upcomingGamesList} bestGameListPreview={bestGameListPreview}/>
  );
};

export default Home;
