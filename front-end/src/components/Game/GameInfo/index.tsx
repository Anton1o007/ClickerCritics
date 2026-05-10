import { FC } from "react";
import {
    AgeRating,
  Box,
  Column,
  Container,
  Description,
  DetailsContainer,
  Genre,
  GenreContainer,
  InfoContainer,
  Label,
  Line,
  Platform,
  PlatformContainer,
  Row,
  TextInfo,
  Title,
} from "./styles";
import { Game } from "@/models/Game/types";

export type Props = {
  gameData: Game;
};

const GameInfo: FC<Props> = ({ gameData }) => {

  const handleRenderGenres = () => {
    if (gameData.genres !== null) {
      return gameData.genres.map((genre, index) => (
        <Genre key={index} >
          {genre}
        </Genre>
      ));
    }
  };

  const handleRenderPlatforms = () => {
    if (gameData.platforms !== null) {
      return gameData.platforms.map((platform, index) => (
        <Platform key={index} >
          {platform}
        </Platform>
      ));
    }
  };

  function formatDate(date: Date): string {
    const months: string[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${month} ${day},${year}`;
  }

  const date = formatDate(gameData.release_date).toString();

  return (
    <Container>
      <InfoContainer>
        <Title>DETALLES</Title>
        <Line />
        <DetailsContainer>
          <Column>
            <Description>{gameData.description}</Description>
            <AgeRating>{gameData.age_rating}</AgeRating>
          </Column>
          <Column>
            <Box>
              <Row>
                <Label>Plataformas: </Label>
                <PlatformContainer>
                  {handleRenderPlatforms()}
                </PlatformContainer>
              </Row>
              <Row>
                <Label>Fecha de salida: </Label>
                <TextInfo>{date}</TextInfo>
              </Row>
            </Box>
            <Box>
              <Row>
                <Label>Developer: </Label>
                <TextInfo>{gameData.developer}</TextInfo>
              </Row>
              <Row>
                <Label>Publisher </Label>
                <TextInfo>{gameData.publisher}</TextInfo>
              </Row>
            </Box>
            <Box>
              <Row>
                <Label>Géneros: </Label>
                <GenreContainer>
                {handleRenderGenres()}
                </GenreContainer>
              </Row>
            </Box>
          </Column>
        </DetailsContainer>
      </InfoContainer>
    </Container>
  );
};

export default GameInfo;
