import styled from "styled-components";

export const UpdateProfileButton = styled.button`
  width: 140px;
  background-color: ${props => props.theme.nord.dark1};
  color: ${props => props.theme.nord.light0};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${props => props.theme.nord.green};
  }
  @media (max-width: 430px) {
    width: 60%;
  }
`;