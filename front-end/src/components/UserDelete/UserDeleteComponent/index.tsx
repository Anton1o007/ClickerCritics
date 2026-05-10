import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  DeleteButton,
  TextInfo,
  ConfirmationBackground,
  ConfirmationContent,
  ConfirmationActions,
} from "./styles";

const DeleteUser = () => {
  const router = useRouter();
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const handleDelete = () => {
    setConfirmationVisible(true);
  };

  const cancelDelete = () => {
    setConfirmationVisible(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `https://clicker-critics-api.onrender.com/user/delete/${localStorage.getItem("user_id")}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.ok) {
        localStorage.clear();
        router.push("/");
      } else {
        console.error("Error al borrar el usuario");
      }
    } catch (error) {
      console.error("Error al procesar la solicitud de borrado:", error);
    }
  };

  return (
    <>
      <DeleteButton onClick={handleDelete}>Borrar Usuario</DeleteButton>

      {isConfirmationVisible && (
        <ConfirmationBackground>
          <ConfirmationContent>
            <TextInfo>¿Estás seguro de que deseas borrar tu usuario?</TextInfo>
            <ConfirmationActions>
              <button onClick={confirmDelete}>Sí</button>
              <button onClick={cancelDelete}>No</button>
            </ConfirmationActions>
          </ConfirmationContent>
        </ConfirmationBackground>
      )}
    </>
  );
};

export default DeleteUser;
