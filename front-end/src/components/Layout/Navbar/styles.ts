import styled from 'styled-components';
import Link from "next/link";
import { FaBars } from 'react-icons/fa';

export const NavbarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.nord.dark0};
  color: ${props => props.theme.nord.light0};
  padding: 10px 0px;
`;

interface NavbarItemsContainerProps {
  isMobile?: boolean;
  isDropdownOpen?: boolean;
}

export const NavbarItemsContainer = styled.div<NavbarItemsContainerProps>`
  max-width: 1400px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  ${props => props.isMobile && props.isDropdownOpen && `
    flex-direction: column;
    align-items: center;
  `}
`;

interface DropdownIconProps {
  $isActive?: boolean;
}

export const DropdownIcon = styled(FaBars)<DropdownIconProps>`
  font-size: 25px;
  transition: transform 0.3s ease-in-out;
  ${props =>
    props.$isActive &&
    `
    transform: rotate(90deg);
  `}
`;

export const DropdownIconContainer = styled.div`
  margin-right: 16px;
  cursor: pointer;
`;

export const SearchBarContainer = styled.div`
  width: 300px;
`;

export const DropdownMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.nord.dark0};
  border-top: none;
  padding: 10px;
  padding-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  gap: 2rem;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
`;

export const Logo = styled(Link)`
  font-size: 24px;
  font-family: 'proxima-nova-black', sans-serif;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;

export const LoginButton = styled.button`
  background-color: ${props => props.theme.ochentera.pink0};
  color: ${props => props.theme.ochentera.text};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'proxima-nova-regular', sans-serif;

  &:hover {
    background-color: ${props => props.theme.ochentera.aquagreen};
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  align-content: center;
  gap: 5px;
`;
