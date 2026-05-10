import React, { FC, useState } from "react";
import {
  ConfirmationBackground,
  ConfirmationContent,
  TextInfo,
  StatusButton,
  ButtonsContainer,
  ConfirmButton,
  CancelButton,
  TitleInfo,
  EditButton,
} from "./styles";
import { Game as GameProps } from "@/models/Game/types";

export type Props = {
  gameData: GameProps;
  fetchUserDetails: () => Promise<void>;
};

const EditGameButton: FC<Props> = ({ gameData, fetchUserDetails }) => {
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

  const confirmEditGame = async () => {
    try {
      const response = await fetch(
        `https://clicker-critics-api.onrender.com/user_games/update_game_status/${gameData.id}/${selectedStatus}`,
        {
          method: "PUT", // Cambiar el método a PUT
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setConfirmationVisible(false);
        setSelectedStatus(null);
        fetchUserDetails();
      } else {
        console.error("Error al actualizar el estado del juego");
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
      <EditButton onClick={handleAddGame} />

      {isConfirmationVisible && (
        <ConfirmationBackground>
          <ConfirmationContent>
            <TitleInfo>Editar juego de tu lista personal</TitleInfo>
            <TextInfo>
              Selecciona el nuevo estado que quieres que se le de al juego en tu
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
                onClick={confirmEditGame}
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

export default EditGameButton;
