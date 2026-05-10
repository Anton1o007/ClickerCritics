import React from "react";
import { Column, Container, InfoContainer, Row, Text, Title } from "./styles";
import Image from "next/image";

const AboutScore = () => {
  return (
    <Container>
      <Column>
        <Row>
          <Image
            src="/images/clicker_critics_logo.png"
            width={50}
            height={50}
            alt=""
          />
          <Title>ClickerCritics</Title>
        </Row>

        <Text>¿Cómo puntuamos nuestros juegos?</Text>
      </Column>
      <Column>
        <InfoContainer>
          Nuestra plataforma presenta dos tipos de puntuaciones. La primera
          corresponde a los críticos, personas cualificadas y con gran
          experiencia en el campo de la crítica. Por otro lado, están las
          puntuaciones de los usuarios, es decir, las vuestras.
        </InfoContainer>
        <InfoContainer>
          Además, ofrecemos la posibilidad de que cambiéis, en la configuración
          de vuestro perfil, el peso de las calificaciones que veáis según
          creáis que debe darse mayor importancia a la puntuación de un crítico
          profesional o la de un usuario común.
        </InfoContainer>
      </Column>
    </Container>
  );
};

export default AboutScore;
