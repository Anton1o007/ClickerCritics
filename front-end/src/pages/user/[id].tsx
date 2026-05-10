import React, { useCallback, useEffect, useState } from "react";
import { UserDetails } from "@/containers";
import { User as UserProps } from "@/models/User/types";
import { Game as GameProps } from "@/models/Game/types";
import { useRouter } from "next/router";
import Error from "@/components/Error";
import LoadingAnimation from "@/components/LoadingAnimation";

export type GameScoreTuple = {
  game: GameProps;
  score: number;
};

export type GameStatusTuple = {
  game: GameProps;
  status: string;
};

const User = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [usersList, setUsersListData] = useState<UserProps[]>([]);
  const [gamesList, setGamesListData] = useState<GameScoreTuple[]>([]);
  const [userGenres, setUserGenres] = useState<string[]>([]);
  const [scoredGamesList, setScoredGamesList] = useState<GameScoreTuple[]>([]);
  const [userGamesList, setUserGamesList] = useState<GameStatusTuple[]>([]);
  const [userWishList, setUserWishList] = useState<GameProps[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [isProfessional, setIsProfessional] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const { id } = router.query;

  const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;
  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem("user_id") : null;  

  const fetchData = useCallback(
    async (url: string, setData: (data: any) => void) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          setError(true);
          return;
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(true);
        console.error(`Error fetching data from ${url}:`, error);
      }
    },
    [accessToken]
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(token ? true : false);
  }, []);

  const fetchAllData = useCallback(async () => {
    try {
      const [userDataResponse, currentUserResponse, userGenresResponse, scoredGamesResponse, userGamesResponse, userWishListResponse] =
        await Promise.all([
          fetch(`https://clicker-critics-api.onrender.com/user/${id}`),
          currentUserId ? fetch(`https://clicker-critics-api.onrender.com/user/${currentUserId}`) : Promise.resolve(null),
          fetch(`https://clicker-critics-api.onrender.com/user/user_genres/${id}`),
          fetch(`https://clicker-critics-api.onrender.com/user/scored_games/${id}`),
          fetch(`https://clicker-critics-api.onrender.com/user_games/list/${id}`),
          fetch(`https://clicker-critics-api.onrender.com/wishlist/list/${id}`),
        ]);

      const [userData, currentUser, userGenres, scoredGames, userGames, userWishList] = await Promise.all([
        userDataResponse.json(),
        currentUserResponse ? currentUserResponse.json() : Promise.resolve(null),
        userGenresResponse.json(),
        scoredGamesResponse.json(),
        userGamesResponse.json(),
        userWishListResponse.json(),
      ]);

      setUserData(userData);

      if (currentUser && currentUser.id === userData.id) {
        setCanEdit(true);
      } else {
        setCanEdit(false);
      }

      if (userData.user_type === "PROFESSIONAL") {
        setIsProfessional(true);
      } else {
        setIsProfessional(false);
      }

      setUserGenres(userGenres);

      setScoredGamesList(scoredGames.map((gameScoreTuple: any) => ({
        game: {
          ...gameScoreTuple.game,
          release_date: new Date(gameScoreTuple.game.release_date),
        },
        score: gameScoreTuple.score,
      })));

      setUserGamesList(userGames.map((gameScoreTuple: any) => ({
        game: {
          ...gameScoreTuple.game,
          release_date: new Date(gameScoreTuple.game.release_date),
        },
        status: gameScoreTuple.status,
      })));

      setUserWishList(userWishList.map((game: any) => ({
          ...game,
          release_date: new Date(game.release_date),
      })));
      if (userData.user_type === "ADMIN") {
        const usersListResponse = await fetch(`https://clicker-critics-api.onrender.com/user/`, {
          headers: {
            'user-id': localStorage.getItem("user_id") || "",
          },
        });
        const usersListData = await usersListResponse.json();
        setUsersListData(usersListData.map((user: any) => ({
          ...user,
        })));
        const gamesListResponse = await fetch(`https://clicker-critics-api.onrender.com/game/games_list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "current-user-id": currentUserId || "",
          },
        });
        const gamesListData = await gamesListResponse.json();
        setGamesListData(gamesListData.map((game: any) => ({
          ...game,
        })))

      }

    } catch (error) {
      setError(true);
      console.error("Error fetching data:", error);
    }
  }, [id, currentUserId, accessToken]);

  useEffect(() => {
    if (!id) return;

    fetchAllData();
  }, [id, currentUserId, fetchAllData]);

  if (error) {
    return <Error message="Hubo un error al cargar los datos del usuario." />;
  }

  return userData ? (
    <UserDetails
      userData={userData}
      userGenres={userGenres}
      gameList={scoredGamesList}
      userGameList={userGamesList}
      userWishList={userWishList}
      usersList={usersList}
      gamesList={gamesList}
      fetchUserDetails={fetchAllData}
      authenticated={isAuthenticated}
      canEdit={canEdit}
      isProfessional={isProfessional}
    />
  ) : (<LoadingAnimation />);
};

export default User;

