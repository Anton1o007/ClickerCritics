import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ConfirmationBackground,
  EditButton,
  UpdateContainer,
  Title,
  ErrorContainer,
  CrossContainer,
  CloseButton,
  CritcisContainer,
  Row,
  EmptyMessage,
} from "./styles";
import { Game as GameProps } from "@/models/Game/types";
import { FaTimes } from "react-icons/fa";
import GameCriticCard from "../GameCriticCard";
import { Critic as CriticProps } from "@/models/Critic/types";
import {
  FilterButton,
  FilterContainer,
  SearchButton,
  SearchInput,
  SearchInputContainer,
  UserTypeButton,
} from "../GamesList/styles";

export type Props = {
  gameData: GameProps;
  fetchUserDetails: () => Promise<void>;
};

const ListCriticsButton: FC<Props> = ({ gameData, fetchUserDetails }) => {
  const [accessToken, setAccessToken] = useState<string | null>("");
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [criticsList, setCriticsList] = useState<CriticProps[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [filterExpanded, setFilterExpanded] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userTypeFilter, setUserTypeFilter] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddGame = () => {
    fetchData();
    setConfirmationVisible(true);
  };

  const handleClose = () => {
    setConfirmationVisible(false);
  };

  const handleCloseError = () => {
    setUpdateError("");
  };

  const criticsUrl = useMemo(
    () => `https://clicker-critics-api.onrender.com/critic/game/${gameData.id}`,
    [gameData.id]
  );

  const fetchData = useCallback(async () => {
    if (!gameData.id) return;

    try {
      const criticsResponse = await fetch(criticsUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!criticsResponse.ok) {
        setError(true);
        return;
      }

      const criticsData = await criticsResponse.json();
      const normalizedCriticsList: CriticProps[] = criticsData.map(
        (critic: any) => ({
          ...critic,
        })
      );
      setCriticsList(normalizedCriticsList);
    } catch (error) {
      setError(true);
      console.error("Error fetching critics data:", error);
    }
  }, [gameData.id, criticsUrl, accessToken]);

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
      setUserTypeFilter(null);
    }
  }, [filterExpanded]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setExpanded(!expanded);
    setFocusInput(!expanded);
  };

  const handleUserTypeFilter = (type: string | null) => {
    setUserTypeFilter(type);
  };

  const filteredCriticList = criticsList.filter((critic) => {
    if (!userTypeFilter) {
      return critic.author.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        critic.critic_type === userTypeFilter &&
        critic.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  return (
    <>
      <EditButton onClick={handleAddGame} />
      {isConfirmationVisible && (
        <ConfirmationBackground>
          <UpdateContainer>
            <CrossContainer>
              <CloseButton onClick={handleClose} />
            </CrossContainer>
            <Title>Lista de Críticas</Title>
            {!!updateError && (
              <ErrorContainer>
                {updateError}
                <FaTimes onClick={handleCloseError} />
              </ErrorContainer>
            )}
            <Row>
              <SearchInputContainer>
                <SearchButton onClick={handleSearchButtonClick} />
                <SearchInput
                  type="text"
                  placeholder="Buscar usuario..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  expanded={expanded}
                  ref={inputRef}
                />
              </SearchInputContainer>
              <FilterButton
                onClick={() => setFilterExpanded(!filterExpanded)}
                expanded={filterExpanded}
              />
              <FilterContainer expanded={filterExpanded}>
                <UserTypeButton
                  onClick={() => handleUserTypeFilter(null)}
                  className={userTypeFilter === null ? "seleccionado" : ""}
                >
                  Todos
                </UserTypeButton>
                <UserTypeButton
                  onClick={() => handleUserTypeFilter("ADMIN")}
                  className={userTypeFilter === "ADMIN" ? "seleccionado" : ""}
                >
                  Admin
                </UserTypeButton>
                <UserTypeButton
                  onClick={() => handleUserTypeFilter("USER")}
                  className={userTypeFilter === "USER" ? "seleccionado" : ""}
                >
                  Usuario
                </UserTypeButton>
                <UserTypeButton
                  onClick={() => handleUserTypeFilter("PROFESSIONAL")}
                  className={
                    userTypeFilter === "PROFESSIONAL" ? "seleccionado" : ""
                  }
                >
                  Profesional
                </UserTypeButton>
              </FilterContainer>
            </Row>
            <CritcisContainer>
              {criticsList.length === 0 && (
                <EmptyMessage>
                  Todavía no hay críticas para este juego.
                </EmptyMessage>
              )}{" "}
              {criticsList.length !== 0 && filteredCriticList.length === 0 && (
                <EmptyMessage>
                  No hay críticas que coincidan con los parámetros
                  seleccionados.
                </EmptyMessage>
              )}
              {filteredCriticList.map((criticData, index) => (
                <GameCriticCard
                  key={index}
                  criticData={criticData}
                  fetchData={fetchData}
                />
              ))}
            </CritcisContainer>
          </UpdateContainer>
        </ConfirmationBackground>
      )}
    </>
  );
};

export default ListCriticsButton;
