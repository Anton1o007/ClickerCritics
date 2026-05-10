import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  LogOutButton,
  TextInfo,
  ConfirmationBackground,
  ConfirmationContent,
  ConfirmationActions,
} from "./styles";

const Logout = () => {
  const router = useRouter();
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const handleLogout = () => {
    setConfirmationVisible(true);
  };
  const cancelLogout = () => {
    setConfirmationVisible(false);
  };

  const confirmLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <>
      <LogOutButton onClick={handleLogout}>Cerrar sesión</LogOutButton>

      {isConfirmationVisible && (
        <ConfirmationBackground>
          <ConfirmationContent>
            <TextInfo>¿Estás seguro de que deseas cerrar sesión?</TextInfo>
            <ConfirmationActions>
              <button onClick={confirmLogout}>Sí</button>
              <button onClick={cancelLogout}>No</button>
            </ConfirmationActions>
          </ConfirmationContent>
        </ConfirmationBackground>
      )}
    </>
  );
};

export default Logout;
