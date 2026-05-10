import React, { useEffect, useState, useMemo, useCallback } from "react";
import { GameDetails } from "@/containers";
import { Game as GameProps } from "@/models/Game/types";
import { useRouter } from "next/router";
import Error from "@/components/Error";
import { Critic as CriticProps } from "@/models/Critic/types";

type RatingProps = {
  users: number | null;
  professionals: number | null;
  currentUser: number | null;
};

const Game = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>('');
  const [currentUserId, setCurrentUserId] = useState<string | null>("");
  const [gameData, setGameData] = useState<GameProps | null>(null);
  const [criticsList, setCriticsList] = useState<CriticProps[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [isAddedToWishList, setIsAddedToWishList] = useState<boolean>(false);
  const [isBeforeDate, setIsBeforeDate] = useState<boolean>(false);
  const [averageScore, setAverageScore] = useState<number | null>(null);
  const [hasUserReviewed, setHasUserReviewed] = useState<boolean>(false);
  const [ratings, setRatings] = useState<RatingProps>({
    users: null,
    professionals: null,
    currentUser: null,
  });
  const { id } = router.query;

  const gameDetailsUrl = useMemo(
    () => `https://clicker-critics-api.onrender.com/game/${id}`,
    [id]
  );
  const criticsUrl = useMemo(
    () => `https://clicker-critics-api.onrender.com/critic/game/${id}`,
    [id]
  );
  const ratingsUrl = useMemo(
    () => `https://clicker-critics-api.onrender.com/critic/game/ratings/${id}`,
    [id]
  );
  const isAddedUrl = useMemo(
    () => `https://clicker-critics-api.onrender.com/user_games/is_game_added/${id}`,
    [id]
  );
  const isAddedToWishListUrl = useMemo(
    () => `https://clicker-critics-api.onrender.com/wishlist/is_game_added/${id}`,
    [id]
  );


  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      const [gameResponse, criticsResponse, ratingsResponse, isAddedResponse, isAddedToWishListResponse] =
        await Promise.all([
          fetch(gameDetailsUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "current-user-id": currentUserId || ""
            },
          }),
          fetch(criticsUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }),
          fetch(ratingsUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "current-user-id": currentUserId || "",
            },
          }),
          fetch(isAddedUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "current-user-id": currentUserId || "",
            },
          }),
          fetch(isAddedToWishListUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "current-user-id": currentUserId || "",
            },
          }),
        ]);

      if (!gameResponse.ok || !criticsResponse.ok || !ratingsResponse.ok || !isAddedResponse.ok || !isAddedToWishListResponse.ok) {
        setError(true);
        return;
      }

      const { game_details: gameData, average_score: score } =
        await gameResponse.json();
      const currentDate = new Date();
      const releaseDate = new Date(gameData["release_date"]);
      setIsBeforeDate(releaseDate < currentDate);
      const normalizedGameData: GameProps = {
        ...gameData,
        release_date: releaseDate,
      };
      setGameData(normalizedGameData);

      const numberScore = score !== null ? score : null;
      setAverageScore(numberScore);

      const criticsData = await criticsResponse.json();
      const normalizedCriticsList: CriticProps[] = criticsData.map(
        (critic: any) => ({
          ...critic,
        })
      );

      const sortedCriticsList = normalizedCriticsList.slice().sort((a, b) => {
        if (a.userId === currentUserId) return -1;
        if (b.userId === currentUserId) return 1;
        return 0;
      });
      setCriticsList(sortedCriticsList);

      const {
        average_score_user: userScore,
        average_score_professional: professionalsScore,
        average_score_current_user: currentUserScore,
      } = await ratingsResponse.json();
      const users = userScore !== null ? userScore : null;
      const professionals =
        professionalsScore !== null ? professionalsScore : null;
      const currentUser = currentUserScore !== null ? currentUserScore : null;

      const ratings: RatingProps = {
        users,
        professionals,
        currentUser,
      };

      setRatings(ratings);

      const { is_game_added } = await isAddedResponse.json();
      setIsAdded(is_game_added);

      const { is_game_added_to_wishlist } = await isAddedToWishListResponse.json();
      setIsAddedToWishList(is_game_added_to_wishlist);

    } catch (error) {
      setError(true);
      console.error("Error fetching data:", error);
    }
  },[id, gameDetailsUrl, criticsUrl, ratingsUrl, isAddedUrl, isAddedToWishListUrl, currentUserId, accessToken]);

  const checkUserReview = useCallback(async () => {
    try {
      if (!accessToken) return;

      const response = await fetch(
        `https://clicker-critics-api.onrender.com/critic/has_critic/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHasUserReviewed(data.has_critic);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  },[id, accessToken]);

  useEffect(() => {
    setCurrentUserId(localStorage.getItem("user_id"))
    setAccessToken(localStorage.getItem("access_token"));
    fetchData();
    checkUserReview();
  }, [fetchData, checkUserReview]);
  if (error) {
    return <Error message="Hubo un error al cargar los datos del juego." />;
  }

  return gameData ? (
    <GameDetails
      gameData={gameData}
      criticsList={criticsList}
      score={averageScore}
      ratings={ratings}
      isAdded={isAdded}
      isAddedToWishList={isAddedToWishList}
      isBeforeDate={isBeforeDate}
      hasUserReviewed={hasUserReviewed}
      fetchData={fetchData}
      setIsAdded={setIsAdded}
      setIsAddedToWishList={setIsAddedToWishList}
      setHasUserReviewed={setHasUserReviewed}
      checkReview={checkUserReview}
    />
  ) : null;
};

export default Game;
