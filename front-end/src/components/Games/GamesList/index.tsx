import React, { FC, useState, useRef, useEffect } from "react";
import {
  Container,
  DatePickerStyle,
  FilterButton,
  FilterContainer,
  Row,
  SearchButton,
  SearchInput,
  SearchInputContainer,
  Text,
} from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import GamesCard from "../GamesCard";

export type GameScoreTuple = {
  game: GameProps;
  score: number;
};

export type Props = {
  gameList: GameScoreTuple[];
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
};

const GamesList: FC<Props> = ({
  gameList,
  fetchUserDetails,
  authenticated,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterExpanded, setFilterExpanded] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusInput && inputRef.current) {
      inputRef.current.focus();
      setFocusInput(false);
    }
  }, [focusInput]);

  useEffect(() => {
    if (!expanded) {
      setSearchTerm("");
    }
  }, [expanded]);

  useEffect(() => {
    if (!filterExpanded) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [filterExpanded]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setExpanded(!expanded);
    setFocusInput(!expanded);
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const filteredGameList = gameList.filter((gameData) => {
    if (!startDate && !endDate) {
      return gameData.game.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    } else {
      const releaseDate = new Date(gameData.game.release_date);
      if (
        (!startDate || releaseDate >= startDate) &&
        (!endDate || releaseDate <= endDate)
      ) {
        return gameData.game.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
    }
  });

  return (
    <Container>
      <Row>
        <SearchInputContainer>
          <SearchButton onClick={handleSearchButtonClick} />
          <SearchInput
            type="text"
            placeholder="Buscar juego..."
            value={searchTerm}
            onChange={handleSearchChange}
            expanded={expanded}
            ref={inputRef}
          />
        </SearchInputContainer>
        <SearchInputContainer>
        <FilterButton
          onClick={() => setFilterExpanded(!filterExpanded)}
          expanded={filterExpanded}
        />
        <FilterContainer expanded={filterExpanded}>
          <DatePickerStyle
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha de inicio"
          />
          <Text>-</Text>
          <DatePickerStyle
            selected={endDate}
            onChange={(date) => setEndDate(date as Date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Fecha de fin"
          />
        </FilterContainer>
        </SearchInputContainer>
      </Row>
      {filteredGameList.map((game, index) => (
        <GamesCard
          key={index}
          gameData={game}
          fetchUserDetails={fetchUserDetails}
          authenticated={authenticated}
        />
      ))}
    </Container>
  );
};

export default GamesList;
