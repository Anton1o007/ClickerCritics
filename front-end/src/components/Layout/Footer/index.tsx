import React from "react";
import {
  Column,
  Logo,
  NavbarContainer,
  Row,
  TextInfo,
  TextLink,
  TextTitle,
} from "./styles";
import Image from "next/image";

const Footer = () => {
  return (
    <NavbarContainer>
      <Row>
        <Image
          src="/images/clicker_critics_logo.png"
          width={50}
          height={50}
          alt=""
        />
        <Logo>ClickerCritics</Logo>
      </Row>
      <Row>
        <Column>
          <TextTitle>Atención al cliente</TextTitle>
          <TextLink href={`/info/contact`} >Contacto</TextLink>
        </Column>
      </Row>
      <Row>
        <TextInfo>Powered by</TextInfo>
        <Image
          src="/images/IGDB_logo.png"
          width={80}
          height={80}
          alt="IGDB Logo"
          priority={true}
        />
      </Row>
    </NavbarContainer>
  );
};

export default Footer;
