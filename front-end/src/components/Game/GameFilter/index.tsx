import type { FC } from "react";
import React, { useState, useEffect, useCallback } from "react";
import {
  Background,
  CloseButton,
  Container,
  CrossContainer,
  FilterButton,
  FilterOption,
  FiltersContainer,
  FilterTitle,
  Form,
  Line,
  Title,
} from "./styles";
import { FilterSlider } from "..";

export type Props = {
  platforms: string[];
  genres: string[];
  defaultUrl: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
};

const GameFilter: FC<Props> = ({ platforms, genres, defaultUrl, setUrl }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [minScore, setMinScore] = useState<number | null>(null);
  const [maxScore, setMaxScore] = useState<number | null>(null);
  const [isPlatformListExpanded, setIsPlatformListExpanded] = useState(true);
  const [isGenreListExpanded, setIsGenreListExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const handlePlatformChange = (platform: string) => {
    const updatedPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform];
    setSelectedPlatforms(updatedPlatforms);
  };

  const handleGenreChange = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
  };

  const togglePlatformList = () => {
    setIsPlatformListExpanded(!isPlatformListExpanded);
  };

  const toggleGenreList = () => {
    setIsGenreListExpanded(!isGenreListExpanded);
  };

  useEffect(() => {
    const filteredPlatforms = selectedPlatforms.filter(Boolean).join(",");

    const filteredGenres = selectedGenres.filter(Boolean).join(",");

    const filterUrl = `https://clicker-critics-api.onrender.com/game/games_list${
      filteredPlatforms !== "" ? `?platforms=${filteredPlatforms}` : ""
    }${
      filteredGenres !== ""
        ? `${filteredPlatforms !== "" ? "&" : "?"}genres=${filteredGenres}`
        : ""
    }${
      minScore !== null
        ? `${
            filteredPlatforms !== "" || filteredGenres !== "" ? "&" : "?"
          }min_score=${minScore}`
        : ""
    }${
      maxScore !== null
        ? `${
            filteredPlatforms !== "" ||
            filteredGenres !== "" ||
            minScore !== null
              ? "&"
              : "?"
          }max_score=${maxScore}`
        : ""
    }`;

    const finalUrl =
      filteredPlatforms !== "" ||
      filteredGenres !== "" ||
      minScore !== null ||
      maxScore !== null
        ? filterUrl
        : defaultUrl;

    setUrl(finalUrl);
  }, [
    selectedPlatforms,
    selectedGenres,
    minScore,
    maxScore,
    defaultUrl,
    setUrl,
  ]);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 769);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleOpen = () => {
    setConfirmationVisible(true);
  };

  const handleClose = () => {
    setConfirmationVisible(false);
  };

  return (
    <Container>
      {isMobile ? (
        <>
          <FilterButton onClick={handleOpen}>Filtros</FilterButton>
          {isConfirmationVisible && (
            <Background>
              <Form>
                <CrossContainer>
                  <CloseButton onClick={handleClose} />
                </CrossContainer>
                <FiltersContainer>
                  <FilterOption>
                    <FilterTitle onClick={togglePlatformList}>
                      Plataformas
                    </FilterTitle>
                    {isPlatformListExpanded && (
                      <div>
                        {platforms.map((platform) => (
                          <label key={platform}>
                            <input
                              type="checkbox"
                              value={platform}
                              checked={selectedPlatforms.includes(platform)}
                              onChange={() => handlePlatformChange(platform)}
                            />
                            {platform}
                          </label>
                        ))}
                      </div>
                    )}
                    <FilterTitle onClick={toggleGenreList}>Géneros</FilterTitle>
                    {isGenreListExpanded && (
                      <div>
                        {genres.map((genre) => (
                          <label key={genre}>
                            <input
                              type="checkbox"
                              value={genre}
                              checked={selectedGenres.includes(genre)}
                              onChange={() => handleGenreChange(genre)}
                            />
                            {genre}
                          </label>
                        ))}
                      </div>
                    )}
                  </FilterOption>

                  <FilterOption>
                    <FilterTitle>Puntuación:</FilterTitle>
                    <FilterSlider
                      setMinScore={setMinScore}
                      setMaxScore={setMaxScore}
                    />
                  </FilterOption>
                </FiltersContainer>
              </Form>
            </Background>
          )}
        </>
      ) : (
        <>
          <Title>FILTROS</Title>
          <Line />

          <FilterOption>
            <FilterTitle onClick={togglePlatformList}>Plataformas</FilterTitle>
            {isPlatformListExpanded && (
              <div>
                {platforms.map((platform) => (
                  <label key={platform}>
                    <input
                      type="checkbox"
                      value={platform}
                      checked={selectedPlatforms.includes(platform)}
                      onChange={() => handlePlatformChange(platform)}
                    />
                    {platform}
                  </label>
                ))}
              </div>
            )}
            <FilterTitle onClick={toggleGenreList}>Géneros</FilterTitle>
            {isGenreListExpanded && (
              <div>
                {genres.map((genre) => (
                  <label key={genre}>
                    <input
                      type="checkbox"
                      value={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreChange(genre)}
                    />
                    {genre}
                  </label>
                ))}
              </div>
            )}
          </FilterOption>

          <FilterOption>
            <FilterTitle>Puntuación:</FilterTitle>
            <FilterSlider setMinScore={setMinScore} setMaxScore={setMaxScore} />
          </FilterOption>
        </>
      )}
    </Container>
  );
};

export default GameFilter;
