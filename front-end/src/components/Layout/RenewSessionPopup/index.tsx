import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from "next/router";
import {
  ButtonContainer,
  LogoutButton,
  PopupContent,
  RenewSessionButton,
  SessionExpiredPopup,
  Title
} from './styles';

const RenewSessionPopup = () => {
  const [showRenewPopup, setShowRenewPopup] = useState(false);
  const router = useRouter();

  const renewToken = useCallback(async () => {
    try {
      const currentAccessToken = localStorage.getItem("access_token");
      if (currentAccessToken) {
        const response = await fetch('https://clicker-critics-api.onrender.com/auth/renew-token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${currentAccessToken}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("token_exp", data.exp);
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("username", data.username);
        } else {
          console.error("Error al renovar el token de acceso:", response.statusText);
        }
      } else {
        console.error("Token de acceso actual no encontrado en el almacenamiento local.");
      }
    } catch (error) {
      console.error("Error al renovar el token de acceso:", error);
    }
  }, []);

  const onRenewSession = useCallback(() => {
    setShowRenewPopup(false);
    renewToken();
  }, [renewToken]);

  const checkTokenExpiration = useCallback(() => {
    const tokenExpiration = localStorage.getItem("token_exp");

    if (tokenExpiration) {
      const tokenExpirationNumber = parseFloat(tokenExpiration);
      if (!isNaN(tokenExpirationNumber)) {
        const currentTime = new Date().getTime() / 1000;
        const timeRemaining = tokenExpirationNumber - currentTime;

        if (timeRemaining <= 300) {
          setShowRenewPopup(true);
        }
      }
    }
  }, []);

  const confirmLogout = useCallback(() => {
    localStorage.clear();
    router.push("/");
  }, [router]);

  useEffect(() => {
    checkTokenExpiration();

    const checkTokenInterval = setInterval(() => {
      checkTokenExpiration();
    }, 300000);

    return () => clearInterval(checkTokenInterval);
  }, [checkTokenExpiration]);

  return (
    showRenewPopup && (
      <SessionExpiredPopup>
        <PopupContent>
          <Title>Tu sesión caducará pronto</Title>
          <ButtonContainer>
            <RenewSessionButton onClick={onRenewSession}>Renovar sesión</RenewSessionButton>
            <LogoutButton onClick={confirmLogout}>Cerrar Sesión</LogoutButton>
          </ButtonContainer>
        </PopupContent>
      </SessionExpiredPopup>
    )
  );
};

export default RenewSessionPopup;
