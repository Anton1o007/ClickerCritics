import Link from 'next/link';
import styled from 'styled-components';

export const NavbarContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  background-color: ${props => props.theme.nord.dark0};
  color: ${props => props.theme.nord.light0};
  padding: 50px;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-family: 'proxima-nova-black', sans-serif;
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

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  align-content: center;
  gap: 5px;
`;

export const TextInfo = styled.p`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.light0};
  font-family: "proxima-nova-regular", sans-serif;
  font-size: 16px;
`;

export const TextLink = styled(Link)`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.light0};
  font-family: "proxima-nova-condensed-bold", sans-serif;
  font-size: 20px;
`;

export const TextTitle = styled.p`
  padding: 0%;
  margin: 0%;
  color: ${(props) => props.theme.nord.light0};
  font-family: "proxima-nova-bold", sans-serif;
  font-size: 20px;
  font-weight: bolder;
`;