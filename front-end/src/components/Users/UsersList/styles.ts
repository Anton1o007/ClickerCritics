import { FaFilter, FaSearch } from "react-icons/fa";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding-top: 1rem;
  width: 100%;
  max-width: 1000px;
  height: fit-content;
  gap: 20px;
  margin-top: 20px;
`;

export const CardsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
`;

export const SearchInput = styled.input<{ expanded: boolean }>`
  flex: ${({ expanded }) => (expanded ? '1' : '0')};
  width: 150px;
  max-width: ${({ expanded }) => (expanded ? '200px' : '0')};
  opacity: ${({ expanded }) => (expanded ? '1' : '0')};
  transition: max-width 0.3s ease, opacity 0.3s ease;
  color: ${(props) => props.theme.nord.dark0};
  text-align: center;
  padding: 5px 10px;
  font-family: "proxima-nova-regular";
  font-size: 18px;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 6px;
  text-align: left;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.nord.dark1};
  outline: none;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchButton = styled(FaSearch)`
  font-size: 20px;
  color: ${props => props.theme.nord.dark4};
  cursor: pointer;
`;

export const FilterButton = styled(FaFilter)<{ expanded: boolean }>`
  font-size: 20px;
  color: ${props => props.theme.nord.dark4};
  cursor: pointer;
  transform: ${({ expanded }) => (expanded ? 'rotate(0deg)' : 'rotate(90deg)')};
  transition: transform 0.3s ease;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: fit-content;
  margin: 0;
  align-items: baseline;
  gap: 10px;
  @media (max-width: 430px) {
    width: 100%;
  }
`;

export const UsersCardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const UserTypeButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.nord.dark4};
  background-color: ${(props) => props.theme.nord.light3};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => props.theme.nord.dark1};
  }

  &.seleccionado {
    color: ${(props) => props.theme.nord.light0};
    background-color: ${(props) => props.theme.nord.dark1};
  }
  @media (max-width: 380px) {
    font-size: 12px;
  }
  @media (max-width: 330px) {
    font-size: 10px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: 80%;
  height: fit-content;
  align-items: baseline;
  gap: 20px;
  @media (max-width: 430px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const FilterContainer = styled.div<{ expanded: boolean }>` // Eliminar las propiedades expandidas
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: ${({ expanded }) => (expanded ? '100%' : '0')}; // Definir el ancho en función de la propiedad expandida
  height: fit-content;
  align-items: baseline;
  gap: 10px;
  overflow: hidden; // Ocultar el contenido que excede el ancho del contenedor
  transition: width 0.3s ease; // Aplicar una transición al ancho
`;
