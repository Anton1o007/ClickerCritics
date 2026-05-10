import React, { FC, useState } from "react";
import {
  Background,
  CloseButton,
  Column,
  Container,
  Cover,
  CriticButton,
  CrossContainer,
  Loader,
  ErrorContainer,
  Form,
  GameCard,
  Input,
  Label,
  SubmitButton,
  TextDate,
  Title,
} from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import { RatingSlider } from "..";
import { FaTimes } from "react-icons/fa";

export type Props = {
  game: GameProps;
  setHasUserReviewed: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
};

const CriticForm: FC<Props> = ({ game, setHasUserReviewed, fetchData }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  function formatDate(date: Date): string {
    const months: string[] = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${month} ${day},${year}`;
  }

  const handleCloseError = () => {
    setErrorMessage("");
  };

  const handleOpen = () => {
    setText("");
    setRating(null);
    setErrorMessage("");
    setConfirmationVisible(true);
  };

  const handleClose = () => {
    setConfirmationVisible(false);
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === null && !text) {
      setErrorMessage("Por favor, escribe una crítica y selecciona una puntuación entre 1 y 10.");
      return;
    }

    if (rating === null) {
      setErrorMessage("Por favor, selecciona una puntuación entre 1 y 10.");
      return;
    }

    if (rating <= 0) {
      setErrorMessage("Por favor, selecciona una puntuación entre 1 y 10.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("gameId", game.id);
      formData.append("text", text);
      formData.append("score", rating.toString());

      const response = await fetch(
        "https://clicker-critics-api.onrender.com/critic/create_critic",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setLoading(false);
        handleClose();
        setHasUserReviewed(true);
        fetchData();
      } else {
        setLoading(false);
        const responseData = await response.json();
        setErrorMessage(responseData.detail);
        console.error("Error al enviar la crítica");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error en la solicitud:", error);
    }
  };

  const date = formatDate(game.release_date).toString();

  return (
    <>
      <Container>
        <CriticButton onClick={handleOpen}>Nueva Crítica</CriticButton>
      </Container>
      {isConfirmationVisible && (
        <Background>
          <Form>
            <CrossContainer>
              <CloseButton onClick={handleClose} />
            </CrossContainer>
            <Title>Nueva Crítica</Title>
            <GameCard>
              <Cover
                src={game.cover}
                width={1000}
                height={1000}
                alt=""
                style={{
                  maxWidth: `90px`,
                  height: `130px`,
                }}
              />
              <Column>
                <Label>{game.title}</Label>
                <TextDate>{date}</TextDate>
              </Column>
            </GameCard>
            {isLoading && (<Loader />)}
            {errorMessage && (
              <ErrorContainer>
                {errorMessage}
                <span onClick={handleCloseError}>
                  <FaTimes />
                </span>
              </ErrorContainer>
            )}
            <Input
              name="Texto de la crítica"
              placeholder="Texto de la crítica..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <RatingSlider onRatingChange={handleRatingChange} />
            <SubmitButton type="submit" onClick={handleSubmit}>
              Enviar
            </SubmitButton>
          </Form>
        </Background>
      )}
    </>
  );
};

export default CriticForm;
