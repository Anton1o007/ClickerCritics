import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

interface SearchProps {
  $containerWidth: string;
}

export const SearchInput = styled.input<SearchProps>`
  width: ${({ $containerWidth }) => $containerWidth}; 
  display: flex;
  border: none;
  font-size: 16px;
  background-color: ${props => props.theme.nord.light0};
  font-family: 'proxima-nova-regular', sans-serif;

  &::placeholder {
    color: ${props => props.theme.nord.dark3};
    font-family: 'proxima-nova-regular', sans-serif;
  }

  &:focus{
    outline: none;
  }
`;

interface SearchButtonProps {
  $searchButtonSize: string;
}

export const SearchButton = styled(FaSearch)<SearchButtonProps>`
  font-size: ${({ $searchButtonSize }) => $searchButtonSize};
  color: ${props => props.theme.nord.dark4};
  cursor: pointer;
`;

interface RowProps {
  $containerPadding: string;
}

export const Row = styled.div<RowProps>`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: ${({ $containerPadding }) => $containerPadding};
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
  align-items: center;
  align-content: center;
  background-color: ${props => props.theme.nord.light0};
  gap: 5px;
`;