import { FC, useState } from "react";
import YouTube from "react-youtube";
import Image from "next/image";
import {
  Container,
  DetailsContainer,
  InfoContainer,
  Line,
  Title,
  CarouselWrapper,
  MediaWrapper,
} from "./styles";
import { Game } from "@/models/Game/types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export type Props = {
  gameData: Game;
};

const GameCarousel: FC<Props> = ({ gameData }) => {
  const [selectedSlide, setSelectedSlide] = useState<number>(0);

  const handleSlideChange = (index: number) => {
    setSelectedSlide(index);
  };

  const renderImages = () => {
    return gameData.images.map((image: string, index: number) => (
      <MediaWrapper key={`image-${index}`}>
        <Image
          src={image}
          alt={`Image ${index}`}
          layout="fill"
          objectFit="contain"
        />
      </MediaWrapper>
    ));
  };

  const renderVideos = () => {
    return gameData.videos.map((videoId: string, index: number) => (
      <MediaWrapper key={`video-${index}`}>
        {videoId && (
          <YouTube
            videoId={videoId}
            style={{ width: "100%", height: "100%" }}
            onError={(e) => console.error('Error al cargar el video', e)}
            opts={{ playerVars: { controls: 1 } }}
          />
        )}
      </MediaWrapper>
    ));
  };

  return (
    <Container>
      <InfoContainer>
        <Title>TRAILER E IMÁGENES</Title>
        <Line />
        <DetailsContainer>
          <CarouselWrapper>
            <Carousel
              dynamicHeight
              infiniteLoop
              showThumbs
              onChange={handleSlideChange}
            >
              {[...renderVideos(), ...renderImages()]}
            </Carousel>
          </CarouselWrapper>
        </DetailsContainer>
      </InfoContainer>
    </Container>
  );
};

export default GameCarousel;
