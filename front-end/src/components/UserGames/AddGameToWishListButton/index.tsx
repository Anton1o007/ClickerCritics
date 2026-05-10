import React, { FC, useState } from "react";
import {
  AddButton,
  ConfirmationBackground,
  ConfirmationContent,
  TextInfo,
  ButtonsContainer,
  ConfirmButton,
  CancelButton,
  TitleInfo,
} from "./styles";
import { Game as GameProps } from "@/models/Game/types";

export type Props = {
  gameData: GameProps;
  setIsAddedToWishList: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddGameToWishListButton: FC<Props> = ({ gameData, setIsAddedToWishList }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const handleAddGame = () => {
    setConfirmationVisible(true);
  };

  const cancelAddGame = () => {
    setConfirmationVisible(false);
  };

  const confirmAddGame = async () => {
    try {
      const response = await fetch(
        `https://clicker-critics-api.onrender.com/wishlist/add_game/${gameData.id}`,
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
        setIsAddedToWishList(true);
      } else {
        console.error("Error al agregar el juego al usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <AddButton onClick={handleAddGame}>Añadir a Deseados</AddButton>

      {isConfirmationVisible && (
        <ConfirmationBackground>
          <ConfirmationContent>
            <TitleInfo>Añadir juego a tu lista personal</TitleInfo>
            <TextInfo>
              Selecciona el estado en el que quieres que se añada el juego a tu
              lista personal de juegos.
            </TextInfo>
            <ButtonsContainer>
              <ConfirmButton
                onClick={confirmAddGame}
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

export default AddGameToWishListButton;
