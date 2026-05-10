import React from 'react';
import { Container, Text } from './styles';

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <Container>
      <Text>
        ❌
        {' '}
        {message}
      </Text>
    </Container>
  );
};

export default Error;
