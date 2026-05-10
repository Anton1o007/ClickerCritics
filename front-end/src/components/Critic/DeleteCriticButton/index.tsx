import React, { FC, useState } from "react";
import {
  ConfirmationBackground,
  ConfirmationContent,
  TextInfo,
  DeleteButton,
  ConfirmButton,
  CancelButton,
  TitleInfo,
} from "./styles";
import { Critic as CriticProps} from "@/models/Critic/types";


export type Props = {
  criticData: CriticProps;
  fetchData: () => Promise<void>;
  checkReview: () => Promise<void>;
};

const DeleteCriticButton: FC<Props> = ({ criticData, fetchData, checkReview }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const handleDeleteGame = () => {
    setConfirmationVisible(true);
  };

  const cancelDeleteGame = () => {
    setConfirmationVisible(false);
  };

  const confirmDeleteGame = async () => {
    try {
      const response = await fetch(
        `https://clicker-critics-api.onrender.com/critic/delete_critic/${criticData.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        setConfirmationVisible(false);
        checkReview();
        fetchData();
      } else {
        console.error("Error al eliminar la crítica");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <DeleteButton onClick={handleDeleteGame} />

      {isConfirmationVisible && (
        <ConfirmationBackground>
          <ConfirmationContent>
            <TitleInfo>Eliminar la critica sobre el juego</TitleInfo>
            <TextInfo>
              ¿Estás seguro de que quieres eliminar esta crítica sobre el juego?
            </TextInfo>
            <ConfirmButton onClick={confirmDeleteGame}>Confirmar</ConfirmButton>
            <CancelButton onClick={cancelDeleteGame}>Cancelar</CancelButton>
          </ConfirmationContent>
        </ConfirmationBackground>
      )}
    </>
  );
};

export default DeleteCriticButton;
