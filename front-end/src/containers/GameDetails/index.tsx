import React, { FC, useEffect, useState } from "react";
import { ChangeButton, Container, ChageRow, ListButton, Text, ButtonsRow } from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import { GameData, GameCarousel, GameInfo } from "@/components/Game";
import { CriticForm, CriticList } from "@/components/Critic";
import { Critic as CriticProps } from "@/models/Critic/types";

type RatingProps = {
  users: number | null;
  professionals: number | null;
  currentUser: number | null;
};

export type Props = {
  gameData: GameProps;
  criticsList: CriticProps[];
  score: number | null;
  ratings: RatingProps;
  isAdded: boolean;
  isAddedToWishList: boolean;
  isBeforeDate: boolean;
  hasUserReviewed: boolean;
  setHasUserReviewed: React.Dispatch<React.SetStateAction<boolean>>; 
  fetchData: () => Promise<void>;
  checkReview: () => Promise<void>;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddedToWishList: React.Dispatch<React.SetStateAction<boolean>>; 
};

const GameDetails: FC<Props> = ({ gameData, criticsList, score, ratings, isAdded, isAddedToWishList, isBeforeDate, hasUserReviewed, fetchData, setIsAdded, setIsAddedToWishList, setHasUserReviewed, checkReview }) => {
  const [showInfo, setShowInfo] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredCriticsList, setFilteredCriticsList] = useState<CriticProps[]>(criticsList);
  const [selectedButton, setSelectedButton] = useState('Todas');
  const [criticRating, setCriticRating] = useState<number | null>(null);

  const handleInfoClick = () => {
    setShowInfo(false);
  };

  const handleCriticasClick = () => {
    setShowInfo(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(token ? true : false);
  }, []);


  const handleListAllClick = () => {
    setFilteredCriticsList(criticsList);
    setCriticRating(null);
    setSelectedButton('Todas');
  };
  
  const handleListProfessionalClick = () => {
    const professionalCritics = criticsList.filter(critic => critic.critic_type === "PROFESSIONAL");
    setFilteredCriticsList(professionalCritics);
    setCriticRating(ratings.professionals);
    setSelectedButton('Profesionales');
  };
  
  const handleListUserClick = () => {
    const userCritics = criticsList.filter(critic => critic.critic_type === "USER");
    setFilteredCriticsList(userCritics);
    setCriticRating(ratings.users);
    setSelectedButton('Usuarios');
  };

  useEffect(() => {
    setFilteredCriticsList(criticsList);
  }, [criticsList]);

  return (
    <Container>
      <GameData gameData={gameData} score = {score} ratings={ratings} authenticated = {isAuthenticated} isAdded={isAdded} isAddedToWishList={isAddedToWishList} isBeforeReleaseDate={isBeforeDate} setIsAdded={setIsAdded} setIsAddedToWishList={setIsAddedToWishList} />
      <ChageRow>
        <ChangeButton
          onClick={handleCriticasClick}
          className={showInfo ? "subrayado" : ""}
        >
          Críticas
        </ChangeButton>
        <ChangeButton
          onClick={handleInfoClick}
          className={!showInfo ? "subrayado" : ""}
        >
          Información
        </ChangeButton>
      </ChageRow>
      {showInfo ? (
        <>
          {isAuthenticated && !hasUserReviewed && isBeforeDate && (
            <CriticForm
              game={gameData}
              setHasUserReviewed={setHasUserReviewed}
              fetchData={fetchData}
            />
          )}
          {criticsList.length > 0 ? (
            <>
            <ButtonsRow>
            <ListButton className={selectedButton === 'Todas' ? 'seleccionado' : ''} onClick={handleListAllClick}>
              Todas
            </ListButton>
            <ListButton className={selectedButton === 'Profesionales' ? 'seleccionado' : ''} onClick={handleListProfessionalClick}>
              Profesionales
            </ListButton>
            <ListButton className={selectedButton === 'Usuarios' ? 'seleccionado' : ''} onClick={handleListUserClick}>
              Usuarios
            </ListButton>
            </ButtonsRow>
            <CriticList criticsList={filteredCriticsList} ratingValue={criticRating} fetchData={fetchData} checkReview={checkReview} />
            </>
          ) : (
            <Text>Aún no hay críticas para este juego.</Text>
          )}
        </>
      ) : (
        <>
          <GameInfo gameData={gameData} />
          <GameCarousel gameData={gameData} />
        </>
      )}
    </Container>
  );
};

export default GameDetails;
