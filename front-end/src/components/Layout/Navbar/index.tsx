import React, { useState, useEffect, useCallback } from "react";
import {
  NavbarContainer,
  NavbarItemsContainer,
  Logo,
  LoginButton,
  DropdownMenu,
  DropdownIconContainer,
  SearchBarContainer,
  LogoContainer,
  DropdownIcon
} from "./styles";
import Link from "next/link";
import { SearchBar } from "@/components/Search";
import Image from "next/image";

const Navbar = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const checkCredentials = () => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedUserId = localStorage.getItem("user_id");
    if (storedAccessToken && storedUserId) {
      setAccessToken(storedAccessToken);
      setUserId(storedUserId);
    } else {
      setAccessToken(null);
      setUserId(null);
    }
  };

  useEffect(() => {
    const checkUserData = async () => {
      checkCredentials();
    };

    checkUserData();

    const checkTokenInterval = setInterval(checkUserData, 1000);

    return () => clearInterval(checkTokenInterval);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const handleCloseMovileNavMenu = () => {
    if (isMobile && isDropdownOpen) {
      toggleDropdown();
    }
  };

  return (
    <NavbarContainer>
      <NavbarItemsContainer>
        <LogoContainer>
          <Image
            src="/images/clicker_critics_logo.png"
            width={50}
            height={50}
            alt=""
          />
          <Logo onClick={handleCloseMovileNavMenu} href="/">ClickerCritics</Logo>
        </LogoContainer>
        {isMobile ? (
          <>
            <DropdownIconContainer onClick={toggleDropdown}>
              <DropdownIcon $isActive={isDropdownOpen} />
            </DropdownIconContainer>
            {isDropdownOpen && (
              <DropdownMenu>
                <SearchBar
                  containerWidth="250px"
                  containerPadding="10px 10px"
                  searchButtonSize="20px"
                  onSearchEnter={handleCloseMovileNavMenu}
                />
                {accessToken ? (
                  <Link href={`/user/${userId}`} passHref>
                    <LoginButton onClick={handleCloseMovileNavMenu}>
                      {localStorage.getItem("username") || "Usuario"}
                    </LoginButton>
                  </Link>
                ) : (
                  <Link href="/auth/login" passHref>
                    <LoginButton onClick={handleCloseMovileNavMenu}>Login</LoginButton>
                  </Link>
                )}
              </DropdownMenu>
            )}
          </>
        ) : (
          <>
            <SearchBarContainer>
              <SearchBar
                containerWidth="300px"
                containerPadding="10px 10px"
                searchButtonSize="20px"
              />
            </SearchBarContainer>
            {accessToken ? (
              <Link href={`/user/${userId}`} passHref>
                <LoginButton>
                  {localStorage.getItem("username") || "Usuario"}
                </LoginButton>
              </Link>
            ) : (
              <Link href="/auth/login" passHref>
                <LoginButton>Login</LoginButton>
              </Link>
            )}
          </>
        )}
      </NavbarItemsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
