import React from "react";
import {
  Column,
  Container,
  Line,
  TextMessage,
  TextMessageContainer,
  Title,
} from "./styles";

const Contact = () => {
  return (
    <Container>
      <Column>
        <Title>CONTACTO</Title>
        <Line />
        <TextMessageContainer>
          <TextMessage>
            Escríbenos a <strong>help.clickercritics@outlook.es</strong> y
            resolveremos cualquier duda.
          </TextMessage>
        </TextMessageContainer>
      </Column>
    </Container>
  );
};

export default Contact;
