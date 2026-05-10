import React, { FC, useState } from "react";
import {
  AddButton,
  ConfirmationBackground,
  ConfirmationContent,
  TextInfo,
  StatusButton,
  ButtonsContainer,
  ConfirmButton,
  CancelButton,
  TitleInfo,
} from "./styles";
import { Game as GameProps } from "@/models/Game/types";

export type Props = {
  gameData: GameProps;
  setIsAdded: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddGameButton: FC<Props> = ({ gameData, setIsAdded }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedStatusWithBorder, setSelectedStatusWithBorder] = useState<string | null>(null);

  const handleAddGame = () => {
    setConfirmationVisible(true);
  };

  const cancelAddGame = () => {
    setConfirmationVisible(false);
    setSelectedStatus(null);
  };

  const confirmAddGame = async () => {
    try {
      const response = await fetch(
        `https://clicker-critics-api.onrender.com/user_games/add_game_to_user/${gameData.id}/${selectedStatus}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setConfirmationVisible(false);
        setSelectedStatus(null);
        setIsAdded(true);
      } else {
        console.error("Error al agregar el juego al usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    setSelectedStatusWithBorder(status);
  };

  return (
    <>
      <AddButton onClick={handleAddGame}>Añadir</AddButton>

      {isConfirmationVisible && (
        <ConfirmationBackground>
          <ConfirmationContent>
            <TitleInfo>Añadir juego a tu lista personal</TitleInfo>
            <TextInfo>
              Selecciona el estado en el que quieres que se añada el juego a tu
              lista personal de juegos.
            </TextInfo>
            <ButtonsContainer>
              <StatusButton
                status="NOT_STARTED"
                onClick={() => handleStatusSelect("NOT_STARTED")}
                disabled={selectedStatus === "NOT_STARTED"}
                withBorder={selectedStatusWithBorder === "NOT_STARTED"}
              />
              <StatusButton
                status="IN_PROGRESS"
                onClick={() => handleStatusSelect("IN_PROGRESS")}
                disabled={selectedStatus === "IN_PROGRESS"}
                withBorder={selectedStatusWithBorder === "IN_PROGRESS"}
              />
              <StatusButton
                status="COMPLETED"
                onClick={() => handleStatusSelect("COMPLETED")}
                disabled={selectedStatus === "COMPLETED"}
                withBorder={selectedStatusWithBorder === "COMPLETED"}
              />
            </ButtonsContainer>
            <ButtonsContainer>
              <ConfirmButton
                onClick={confirmAddGame}
                disabled={!selectedStatus}
              >
                Confirmar
              </ConfirmButton>
              <CancelButton onClick={cancelAddGame}>Cancelar</CancelButton>
            </ButtonsContainer>
          </ConfirmationContent>
        </ConfirmationBackground>
      )}
    </>
  );
};

export default AddGameButton;
