import React, { FC, useState, useRef, useEffect } from "react";
import {
  Container,
  FilterButton,
  FilterContainer,
  Row,
  SearchButton,
  SearchInput,
  SearchInputContainer,
  UserTypeButton,
} from "./styles";
import { User as UserProps } from "@/models/User/types";
import UsersCard from "../UsersCard";

export type Props = {
  userList: UserProps[];
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
};

const UsersList: FC<Props> = ({
  userList,
  fetchUserDetails,
  authenticated,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expanded, setExpanded] = useState<boolean>(false);
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [userTypeFilter, setUserTypeFilter] = useState<string | null>(null);
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

  const filteredUserList = userList.filter((user) => {
    if (!userTypeFilter) {
      return user.username.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return (
        user.user_type === userTypeFilter &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  return (
    <Container>
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
        <SearchInputContainer>
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
        </SearchInputContainer>
      </Row>
      {filteredUserList.map((user, index) => (
        <UsersCard
          key={index}
          userData={user}
          fetchUserDetails={fetchUserDetails}
          authenticated={authenticated}
        />
      ))}
    </Container>
  );
};

export default UsersList;
