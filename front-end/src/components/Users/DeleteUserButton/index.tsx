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
import { User as UserProps } from "@/models/User/types";

export type Props = {
  userData: UserProps;
  fetchUserDetails: () => Promise<void>;
};

const DeleteuserButton: FC<Props> = ({ userData, fetchUserDetails }) => {
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
        `https://clicker-critics-api.onrender.com/user/delete/${userData.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        setConfirmationVisible(false);
        fetchUserDetails();
      } else {
        console.error("Error al eliminar el juego");
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
            <TitleInfo>Eliminar juego de tu lista personal</TitleInfo>
            <TextInfo>
              ¿Estás seguro de que quieres eliminar este juego de tu lista
              personal?
            </TextInfo>
            <ConfirmButton onClick={confirmDeleteGame}>Confirmar</ConfirmButton>
            <CancelButton onClick={cancelDeleteGame}>Cancelar</CancelButton>
          </ConfirmationContent>
        </ConfirmationBackground>
      )}
    </>
  );
};

export default DeleteuserButton;
